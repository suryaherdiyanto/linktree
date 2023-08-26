import { IsDate, IsString, MaxLength, MinLength, ValidateIf } from "class-validator";

class UpdateProfile {

    @IsString()
    @MaxLength(200)
    @ValidateIf((object: any, value: any) => value !== null)
    bio?: string;

    @IsDate({ message: 'Birthday must be a valid date format' })
    birthday: string;
}