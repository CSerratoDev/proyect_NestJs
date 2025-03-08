import { IsArray, IsString, MaxLength, maxLength } from "class-validator";

export class CreateRegionDto{
    @IsString()
    @MaxLength(100)
    regionName: string;
    @IsArray()
    regionStates: string[];
}
