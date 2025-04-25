import { IsEmail, IsNumber, IsObject, IsOptional, IsString, MaxLength } from "class-validator";
import { Location } from "src/locations/entities/location.entity";
import { Manager } from "../entities/manager.entity";

export class CreateManagerDto extends Manager{
    @IsString()
    @MaxLength(80)
    declare managerFullName: string;
    @IsEmail()
    declare managerEmail: string;
    @IsNumber()
    declare managerSalar: number;
    @IsString()
    @MaxLength(16)
    declare managarPhoneNumber: number;
    @IsNumber()
    @IsOptional()
    declare location : Location;
}
