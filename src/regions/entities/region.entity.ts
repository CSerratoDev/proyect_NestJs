import { Location } from "src/locations/entities/location.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Region {
    @PrimaryGeneratedColumn('increment')
    declare regionId: number;
    @Column({
            type: "text",
            unique: true
    })
    declare regionName: string;
    @Column('simple-array')
    declare regionStates: string[];

    @OneToMany(()=> Location, (location) => location.region)
    declare locations: Location[]
}
