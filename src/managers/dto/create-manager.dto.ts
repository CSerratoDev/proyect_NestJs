import { IsEmail, IsNumber, IsObject, IsOptional, IsString, MaxLength } from "class-validator";
import { Location } from "src/locations/entities/location.entity";
import { Manager } from "../entities/manager.entity";

export class CreateManagerDto extends Manager{
    @IsString()
    @MaxLength(80)
    managerFullName: string;
    @IsEmail()
    managerEmail: string;
    @IsNumber()
    managerSalar: number;
    @IsString()
    @MaxLength(16)
    managarPhoneNumber: number;
    @IsObject()
    @IsOptional()
    location : Location;
}
