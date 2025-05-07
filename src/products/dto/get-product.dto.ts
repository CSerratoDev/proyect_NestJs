import { IsOptional, IsUUID } from "class-validator";

export class GetProductQueryDto {
    @IsOptional()
    @IsUUID('4', {message: 'The Provider must be a UUID'})
    provider_id?: string;
}