import { Model, Table, Column, DataType } from 'sequelize-typescript';
import { UserCreationAttrs } from './users.interfaces';
import { ApiProperty } from '@nestjs/swagger';

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttrs> {
  @ApiProperty({ example: '1', description: 'Unique identification' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'user@test.com', description: 'User email' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  email: string;

  @ApiProperty({ example: '12345', description: 'User password' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @ApiProperty({ example: 'true', description: 'Banned or not' })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  banned: boolean;

  @ApiProperty({
    example: 'breaking the rules',
    description: 'Reason of banning',
  })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  banReason: string;
}
