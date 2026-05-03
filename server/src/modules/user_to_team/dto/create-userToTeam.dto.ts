import { Type } from "class-transformer";
import { IsInt, IsObject, ValidateNested } from "class-validator";
import { AccessToTeamPermissionsDto } from "./access.dto";


export class CreateAccessDto {
    @IsInt()
    userId: number;

    @IsInt()
    teamId: number;

    @IsObject()
    @ValidateNested()
    @Type(() => AccessToTeamPermissionsDto)
    access: AccessToTeamPermissionsDto;
}


