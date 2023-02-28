import { IsEnum } from "class-validator";
import { Entity, Column, ManyToOne, OneToMany} from "typeorm"
import { SharedEntity } from "../common/model/sharedEntity";
import { Buddy } from "./buddy";
import { User } from "./User";

export type Frequency = 'daily' | 'weekly' | 'monthly'

@Entity()
export class Saving_Plan extends SharedEntity{

    @Column({nullable: false})
    title: string;

    @Column({nullable: false})
    number_of_saving_buddies: string;

    @Column({nullable: false})
    target_set: boolean;

    @Column({nullable: false})
    saving_process: string;

    @Column({
      type: 'enum',
      enum: ['daily', 'weekly','monthly'],
    })
    @IsEnum(['daily', 'weekly','monthly'])
    saving_frequency: Frequency;

    @Column({nullable: false})
    twelve_month_saving_target: number;

    @Column({nullable: false})
    saving_start: Date;

    @ManyToOne(() => User, user => user.saving_plans)
    user: User;

    @OneToMany(() => Buddy, buddies => buddies.saving_plan )
    buddies: Buddy[]

}