import { IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";

export class CreateProviderDto {
   @IsNotEmpty({message:'Provider name is required'})
   @IsString()
   @MaxLength(100)
   declare providerName: string;
   @IsNotEmpty({message:'Provider email is required'})
   @IsEmail()
   @IsString()
   declare providerEmail: string;
   @IsString()
   @MaxLength(15)
   @IsOptional()
   declare providerPhoneNumber: string;
}
