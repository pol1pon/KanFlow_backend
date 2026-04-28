import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Collection_access } from '../../db/entities/collection_access.entity';
import { CreateAccessCollection } from './dto/create-access-collection.dto';
import { AccessCollection } from '../../db/json_interface/collection-access';

@Injectable()
export class AccessCollectionService {
    constructor(
        @InjectRepository(Collection_access)
        private readonly CollectionAccessRepo: Repository<Collection_access>,
    ) {}

    async upsertAccess(body: CreateAccessCollection): Promise<Collection_access> {
        const whereCondition: any = { collection_: { id: body.collection_ } }
        if (body.user_) whereCondition.user_ = { id: body.user_ }
        if (body.team_) whereCondition.team_ = { id: body.team_ }

        const accessRecord = await this.CollectionAccessRepo.findOne({
            where: whereCondition
        })
        if (!accessRecord) {
            const newAccess = this.CollectionAccessRepo.create({
                collection_: { id: body.collection_ },
                user_: body.user_ ? { id: body.user_ } : null,
                team_: body.team_ ? { id: body.team_ } : null,
                access: body.access
            });
            return this.CollectionAccessRepo.save(newAccess);
        }

        accessRecord.access = {
            ...accessRecord.access,
            ...body.access
        }
        return this.CollectionAccessRepo.save(accessRecord);
    }

    async getUserAccessForCollection(collectionId: number, userId: number): Promise<AccessCollection> {
        const accessRecord = await this.CollectionAccessRepo.findOne({
            where: {
                collection_: { id: collectionId },
                user_: { id: userId }
            }
        })
        if (!accessRecord) {
        throw new ForbiddenException
        }
        return accessRecord.access
    }
}