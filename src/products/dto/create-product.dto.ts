import { Provider } from "../../providers/entities/provider.entity";
import { IsInt, IsNotEmpty, IsNumber, IsObject, IsOptional, IsString, IsUUID, MaxLength } from "class-validator";
import { Product } from "../entities/product.entity";

export class CreateProductDto extends Product {
    @IsString()
    @IsUUID('4')
    @IsOptional()
    declare productId: string;
    @IsNotEmpty({message:'Product name is required'})
    @IsString()
    @MaxLength(40)
    declare productName: string;
    @IsNotEmpty({message:'Product price is required'})
    @IsNumber()
    declare price: number;
    @IsNotEmpty({message:'Product countSeal is required'})
    @IsInt()
    declare countSeal: number;
    @IsNotEmpty({message:'Provider is required'})
    @IsString()
    @IsUUID()
    declare provider: Provider;
}
