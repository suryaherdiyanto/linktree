import { IsDate, IsDateString, IsString, MaxLength, MinLength, ValidateIf } from "class-validator";

export class UpdateProfileDTO {

    @IsString()
    @MaxLength(200)
    @ValidateIf((object: any, value: any) => value !== null)
    bio?: string;

    @IsDateString()
    birthday: string;
}