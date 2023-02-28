import { IsEnum } from "class-validator";
import { Entity, Column, ManyToOne } from "typeorm"
import { SharedEntity } from "../common/model/sharedEntity";
import { Saving_Plan } from "./saving-plan";

export type Acceptance = 'pending' | 'accepted' | 'declined'

@Entity()
export class Buddy extends SharedEntity{

    @Column({nullable: false})
    buddy: string;

    @Column({
        type: 'enum', 
        enum: ['pending', 'accepted', 'declined'],
        default: 'pending'
    })
    @IsEnum(['pending', 'accepted', 'declined'])
    accceptance: Acceptance;

    @ManyToOne(() => Saving_Plan, saving_plan => saving_plan.buddies)
    saving_plan: Saving_Plan;

}