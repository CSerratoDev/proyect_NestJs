import { IsEmail, IsNumber, IsString, MaxLength } from "class-validator";

export class CreateManagerDto {
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
}
