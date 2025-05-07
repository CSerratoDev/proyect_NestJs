import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from "class-validator";
import { Location } from "src/locations/entities/location.entity";

export class CreateManagerDto {
    @IsNotEmpty({message:'Manager Full Name is required'})
    @IsString()
    @MaxLength(80)
    declare managerFullName: string;
    @IsNotEmpty({message:'Manager email is required'})
    @IsEmail()
    declare managerEmail: string;
    @IsNotEmpty({message:'Manager salary is required'})
    @IsNumber()
    declare managerSalary: number;
    @IsNotEmpty({message:'Manager Phone Number is required'})
    @IsString()
    @MaxLength(16)
    declare managerPhoneNumber: string;
    
    @IsNumber()
    @IsOptional()
    declare location : Location;
}
