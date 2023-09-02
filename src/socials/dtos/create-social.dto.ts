import { IsEnum, IsNotEmpty, IsUrl, MaxLength } from "class-validator";

export class CreateSocialDTO {

    @IsEnum(['facebook', 'twitter', 'linkedin', 'github'])
    social_media: string;

    @MaxLength(50)
    @IsNotEmpty()
    title: string;

    @IsUrl({ require_tld: false })
    url: string;
}