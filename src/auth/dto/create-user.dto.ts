import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsIn, IsOptional, IsString, MinLength } from "class-validator";

export class CreateUserDto {
    @ApiProperty({
        default: "user@gmail.com"
    })
    @IsEmail()
    declare userEmail: string;

    @ApiProperty({
        default: "5618616wear165"
    })
    @IsString()
    @MinLength(8)
    declare userPassword: string;

    @ApiProperty({
        default: "Employee"
    })
    @IsOptional()
    @IsIn(["Admin", "Employee", "Manager"])
    declare userRoles: string[]
}
