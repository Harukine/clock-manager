import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { AuthEntity } from '../../auth/entities/auth.entity';
import { UserSchedule } from './user-schedule.entity';

@Entity()
export class User {
  @Column()
  @PrimaryColumn()
  uid: string;

  @Column({ nullable: false })
  name: string;

  @OneToMany(type => AuthEntity, auth => auth.user)
  auths: AuthEntity[];

  @Column({ nullable: true })
  key: string;

  @OneToMany(type => UserSchedule, userSchedule => userSchedule.user)
  schedule: UserSchedule[];
}
