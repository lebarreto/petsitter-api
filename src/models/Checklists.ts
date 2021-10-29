import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';

import Users from './Users';
import Pets from './Pets';

@Entity('checklists')
class Checklists {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    pet_id: string;

    @Column()
    user_id: string;

    @Column('simple-array')
    questions: string[];

    @ManyToOne(() => Users)
    @JoinColumn({ name: 'user_id' })
    user: boolean;

    @ManyToOne(() => Pets)
    @JoinColumn({ name: 'pet_id' })
    pet: boolean;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default Checklists;
