import { Entity, PrimaryGeneratedColumn, Column, Index } from 'typeorm';

@Entity()
export class WeatherRecord {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'varchar', length: 100 })
    @Index()
    city!: string;

    @Column({ type: 'jsonb' })
    data!: any;

    @Column({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP'
    })
    timestamp!: Date;
}