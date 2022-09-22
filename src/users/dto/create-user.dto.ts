import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'user@test.com', description: 'User email' })
  @IsString({ message: 'Should be a string' })
  @IsEmail({}, { message: 'Invalid email' })
  readonly email: string;

  @ApiProperty({ example: '11111', description: 'User password' })
  @IsString({ message: 'Should be a string' })
  @Length(4, 15, { message: 'Should be not less of 4 and not grater of 15' })
  readonly password: string;
}
