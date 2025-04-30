import { Provider } from "src/providers/entities/provider.entity";
import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";

@Entity()
export class Product {
    @PrimaryGeneratedColumn('uuid')
    declare productId: string;
    @Column({type: 'text'})
    declare productName: string;
    @Column({type: 'float'})
    declare price: number;
    @Column({type: 'int'})
    declare countSeal: number;
    @ManyToOne(() => Provider, (provider) => provider.products)
    @JoinColumn({
        name: "providerId"
    })
    declare provider: Provider
}
