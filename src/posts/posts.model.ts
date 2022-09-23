import {
  Model,
  Table,
  Column,
  DataType,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { PostCreationAttrs } from './post.interfaces';
import { User } from '../users/users.model';

@Table({ tableName: 'posts' })
export class Post extends Model<Post, PostCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  content: string;

  @Column({ type: DataType.STRING })
  image: string;

  @Column({ type: DataType.INTEGER })
  @ForeignKey(() => User)
  userId: number;

  @BelongsTo(() => User)
  author: User;
}
