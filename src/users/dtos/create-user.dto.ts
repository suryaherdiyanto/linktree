import { IsEmail, IsString, MaxLength, Min } from "class-validator";

export class CreateUserDTO {

    @IsString()
    @MaxLength(10)
    username: string;

    @IsEmail()
    email: string;

    @Min(6)
    password: string;

    @IsString()
    name: string;
}