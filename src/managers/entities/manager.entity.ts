import { User } from "src/auth/entities/user.entity";
import { Location } from "src/locations/entities/location.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Manager {
    @PrimaryGeneratedColumn('uuid')
    declare managerId: string;
    @Column('text')
    declare managerFullName: string;
    @Column('float')
    declare managerSalary: number;
    @Column('text', {
        unique: true,
    })
    declare managerEmail: string;
    @Column('text')
    declare managerPhoneNumber: string;

    @OneToOne(() => Location)
    @JoinColumn({
        name: "locationId"
    })
    declare location: Location;

    @OneToOne(()=>User)
    @JoinColumn({
        name: "userId"
    })
    declare user : User
}
