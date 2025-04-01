import { IsArray, IsString, MaxLength, maxLength } from "class-validator";

export class CreateRegionDto{
    @IsString()
    @MaxLength(100)
    declare regionName: string;
    @IsArray()
    declare regionStates: string[];
}
