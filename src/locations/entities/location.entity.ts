import { ApiProperty } from "@nestjs/swagger";
import { Employee } from "src/employees/entities/employee.entity";
import { Manager } from "src/managers/entities/manager.entity";
import { Region } from "src/regions/entities/region.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Location {
    @PrimaryGeneratedColumn('increment')
    declare locationId: number;
    @ApiProperty({
        default: "OXXO Juriquilla"
    })
    @Column('text')
    declare locationName: string;
    @ApiProperty({
        default: "Avenida X, S/N, 01000"
    })
    @Column('text')
    declare locationAddress: string;
    @ApiProperty({
        default: [12,12]
    })
    @Column('simple-array')
    declare locationLatLng: number[];

    @ApiProperty({
        default: "Querétaro"
    })
    @OneToOne(()=> Manager, {
        eager : true,
    })
    @JoinColumn({
        name: "managerId"
    })
    declare manager: Manager | string;
    
    @ManyToOne(() => Region, (region) => region.locations)
    @JoinColumn({
        name: "regionId"
    })
    declare region: Region    
    @OneToMany(()=> Employee, (employee) => employee.location)
    declare employees: Employee[]

}
