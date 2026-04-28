import { IsNumber } from "class-validator"
import { AccessCollection } from "../../../db/json_interface/collection-access"

export class CreateAccessCollection{
    @IsNumber()
    user_: number | null
    @IsNumber()
    team_?: number | null
    @IsNumber()
    collection_: number
    access: AccessCollection
}