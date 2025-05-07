import { IsArray, IsNotEmpty, IsString, MaxLength } from "class-validator";
import { Region } from "../entities/region.entity";

export class CreateRegionDto extends Region{
    @IsNotEmpty({message: 'Region name is required'})
    @IsString()
    @MaxLength(100)
    declare regionName: string;
    @IsNotEmpty({message: 'Region states is required'})
    @IsArray()
    declare regionStates: string[];
}
