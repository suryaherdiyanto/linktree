import { IsEnum, IsNotEmpty, IsUrl, MaxLength } from "class-validator";
import { socials } from "../../entities/socials.entity";

export class CreateSocialDTO {

    @IsEnum(socials)
    social_media: string;

    @MaxLength(50)
    @IsNotEmpty()
    title: string;

    @IsUrl({ require_tld: false })
    url: string;
}