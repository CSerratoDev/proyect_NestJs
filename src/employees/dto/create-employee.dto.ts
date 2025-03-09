import { IsEmail, IsObject, IsOptional, IsString, MaxLength } from "class-validator";
import { Employee } from "../entities/employee.entity";
import { Location } from "src/locations/entities/location.entity";
import { User } from "src/auth/entities/user.entity";

export class CreateEmployeeDto extends Employee {
    @IsOptional()
    declare employeeId: string;
    @IsOptional()
    declare employeePhoto: string;
    @IsOptional()
    declare user: User;

    @IsString()
    @MaxLength(30)
    declare employeeName: string;
    @IsString()
    @MaxLength(70)
    declare employeeLastName: string;
    @IsString()
    @MaxLength(10)
    declare employeePhoneNumber: string;
    @IsString()
    @IsEmail()
    declare employeeEmail: string;
    @IsOptional()
    @IsObject()
    declare location : Location;
}
