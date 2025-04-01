import { Employee } from "src/employees/entities/employee.entity";
import { Manager } from "src/managers/entities/manager.entity";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User{
    @PrimaryGeneratedColumn('uuid')
    declare userId: string;
    @Column('text',{
        unique: true,
    })
    declare userEmail: string;
    @Column('text')
    declare userPassword: string;
    
    @Column("simple-array", {
        default: "Employee"
    })
    declare userRoles: string[];
    
    @OneToOne(() => Manager)
    declare manager: Manager;

    @OneToOne(() => Employee)
    declare employee: Employee;
}