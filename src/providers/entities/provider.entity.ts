import { Product } from 'src/products/entities/product.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Provider {
    @PrimaryGeneratedColumn('uuid')
    declare providerId: string;
    @Column('text')
    declare providerName: string;
    @Column('text', {
        unique: true,
    })
    declare providerEmail: string;
    @Column({
        type: 'text',
        nullable: true
    })
    declare providerPhoneNumber: string;
    @OneToMany(() => Product, (photo) => photo.provider)
    declare products: Product[]
}
