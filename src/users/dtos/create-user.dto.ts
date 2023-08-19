import { IsEmail, IsString, MaxLength, MinLength } from "class-validator";

export class CreateUserDTO {

    @IsString()
    @MaxLength(10)
    username: string;

    @IsEmail({})
    email: string;

	@MinLength(6)
    password: string;

    @IsString()
    name: string;
}
