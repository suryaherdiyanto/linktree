import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class CreateUserDTO {

    @IsString()
    @MaxLength(30)
    username: string;

    @IsEmail()
    @MaxLength(50)
    email: string;

	@MinLength(6)
    password: string;

    @IsNotEmpty()
	password_confirmation: string;

    @IsString()
    @MaxLength(50)
    name: string;
}
