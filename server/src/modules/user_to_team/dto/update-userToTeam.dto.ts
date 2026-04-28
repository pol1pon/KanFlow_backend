import { OmitType, PartialType } from "@nestjs/mapped-types";
import { CreateAccessDto } from './create-userToTeam.dto';
import { AccessToTeamPermissionsDto } from "./access.dto";
export class UpdateAccessDto extends PartialType(OmitType(CreateAccessDto, ['userId', 'teamId'] as const)){
    access?: AccessToTeamPermissionsDto | undefined;
}