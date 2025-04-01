
import { User } from "src/auth/entities/user.entity";
import { Location } from "src/locations/entities/location.entity";
import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToOne } from "typeorm";

@Entity()
export class Employee {
    @PrimaryGeneratedColumn('uuid')
    declare employeeId: string;
    
    @Column('text')
    declare employeeName: string;
    @Column('text')
    declare employeeLastName: string;
    @Column('text')
    declare employeePhoneNumber: string;
    @Column('text', {
        unique: true,
    })
    declare employeeEmail: string;
    @Column({
        type: 'text',
        nullable : true
    })
    declare employeePhoto: string;
    @ManyToOne (() => Location, (location) => location.employees)
    @JoinColumn({
        name: "locationId"
    })
    declare location: Location;
    @OneToOne(()=> User)
    @JoinColumn({
        name: "userId"
    })
    declare user: User;
}