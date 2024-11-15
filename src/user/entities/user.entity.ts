import { CommonEntity } from 'src/common/typeorm/common-entity';
import { Gender } from 'src/gender/entities/gender.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity()
export class User extends CommonEntity {
  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @ManyToOne(() => Gender)
  @JoinColumn({ referencedColumnName: 'id' })
  gender: Gender;
}
