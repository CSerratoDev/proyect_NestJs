import { ArrayNotEmpty, IsArray, isArray, IsString, MaxLength } from "class-validator";

export class CreateLocationDto extends Location{
    @IsString()
    @MaxLength(35)
    locationName: string;
    @IsString()
    @MaxLength(160)
    adress: string;
    @IsArray()
    @ArrayNotEmpty()
    locationLatLng: number[]
}
