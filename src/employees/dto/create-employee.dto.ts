import { IsEmail, IsObject, IsOptional, IsString, MaxLength } from "class-validator";
import { Employee } from "../entities/employee.entity";
import { Location } from "src/locations/entities/location.entity";
import { User } from "src/auth/entities/user.entity";
import { ApiProperty } from "@nestjs/swagger";

export class locationEmployeeDto extends Location {
    @ApiProperty()
    declare locationId: number;
    @ApiProperty()
    declare locationName: string;
    @ApiProperty()
    declare locationLatLng: number[];
    @ApiProperty()
    declare locationAddress: string;
}

export class CreateEmployeeDto extends Employee {
    @ApiProperty()
    @IsOptional()
    declare employeeId: string;
    @ApiProperty()
    @IsOptional()
    declare employeePhoto: string;
    @ApiProperty()
    @IsOptional()
    declare user: User;
    @ApiProperty()
    @IsString()
    @MaxLength(30)
    declare employeeName: string;
    @ApiProperty()
    @IsString()
    @MaxLength(70)
    declare employeeLastName: string;
    @ApiProperty()
    @IsString()
    @MaxLength(10)
    declare employeePhoneNumber: string;
    @ApiProperty()
    @IsString()
    @IsEmail()
    declare employeeEmail: string;
    @ApiProperty()
    @IsOptional()
    @IsObject()
    declare location : locationEmployeeDto;
}