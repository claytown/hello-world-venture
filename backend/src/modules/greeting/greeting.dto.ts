import { IsString, IsNotEmpty } from 'class-validator';

export class CreateGreetingDto {
  @IsString()
  @IsNotEmpty()
  message!: string;
}
