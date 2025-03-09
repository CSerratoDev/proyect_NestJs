import { IsEmail, IsOptional, IsString, MaxLength } from "class-validator";
import { Employee } from "../entities/employee.entity";

export class CreateEmployeeDto extends Employee {
    @IsString()
    @MaxLength(30)
    declare name: string;
    @IsString()
    @MaxLength(70)
    declare lastName: string;
    @IsString()
    @MaxLength(10)
    declare phoneNumber: string;
    @IsString()
    @IsEmail()
    declare email: string;
}
