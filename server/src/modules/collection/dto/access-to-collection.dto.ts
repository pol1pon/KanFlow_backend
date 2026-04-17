import { IsBoolean } from "class-validator"

export class AccessToCollectionDTO{
    @IsBoolean()
    CanRead: boolean
    @IsBoolean()
    CanAddTask: boolean
    @IsBoolean()
    CanMoveTask: boolean
}