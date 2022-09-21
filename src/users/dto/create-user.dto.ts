import { ApiProperty } from '@nestjs/swagger';
export class CreateUserDto {
  @ApiProperty({ example: 'user@test.com', description: 'User email' })
  readonly email: string;

  @ApiProperty({ example: '11111', description: 'User password' })
  readonly password: string;
}
