import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, MinLength } from "class-validator";

export class LoginUserDto{
    @ApiProperty({
        default: "user@gmail.com"
    })
    @IsString()
    @IsEmail()
    declare userEmail: string;
    @ApiProperty({
        default: "e2dawfwae2"
    })
    @MinLength(8)
    @IsString()
    declare userPassword: string;
}