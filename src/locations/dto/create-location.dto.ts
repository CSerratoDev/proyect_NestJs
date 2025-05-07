import { ArrayNotEmpty, IsArray, IsNotEmpty, IsObject, IsOptional, IsString, IsUUID, MaxLength } from "class-validator";
import { Region } from "src/regions/entities/region.entity";

export class CreateLocationDto {
    @IsNotEmpty({message:'Location Name is required'})
    @IsString()
    @MaxLength(35)
    declare locationName: string;
    @IsNotEmpty({message:'Location Name is required'})
    @IsString()
    @MaxLength(160)
    declare locationAddress: string;
    @IsNotEmpty({message:'Location Latitude and longitude required'})
    @IsArray()
    @ArrayNotEmpty()
    declare locationLatLng: number[];
    @IsObject()
    @IsOptional()
    declare region: Region;
    @IsUUID()
    @IsOptional()
    declare manager : string;
}
