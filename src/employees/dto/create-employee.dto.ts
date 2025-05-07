import { IsEmail, IsNotEmpty, IsObject, IsOptional, IsString, MaxLength } from "class-validator";
import { Location } from "src/locations/entities/location.entity";
import { User } from "src/auth/entities/user.entity";
import { ApiProperty } from "@nestjs/swagger";

export class CreateEmployeeDto {
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
    @IsNotEmpty({message:'Name employee is required'})
    @IsString()
    @MaxLength(30)
    declare employeeName: string;
    @ApiProperty()
    @IsNotEmpty({message:'LastName employee is required'})
    @IsString()
    @MaxLength(70)
    declare employeeLastName: string;
    @ApiProperty()
    @IsNotEmpty({message:'Phone employee is required'})
    @IsString()
    @MaxLength(10)
    declare employeePhoneNumber: string;
    @ApiProperty()
    @IsNotEmpty({message:'Employee email is required'})
    @IsString()
    @IsEmail()
    declare employeeEmail: string;
    @ApiProperty()
    @IsOptional()
    @IsObject()
    declare location : Location;
}