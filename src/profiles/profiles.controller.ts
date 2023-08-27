import { Body, Controller, FileTypeValidator, Get, MaxFileSizeValidator, ParseFilePipe, Put, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { JWTGuard } from '../users/guards/jwt.guard';
import { ProfilesService } from './profiles.service';
import { User as UserJWT } from '../users/decorators/jwt-user.decorator';
import { User } from '../users/users.entity';
import { UpdateProfileDTO } from './dtos/update-profile.dto';
import { StorageService } from 'src/storage/storage.service';
import { FileInterceptor } from '@nestjs/platform-express';
import * as crypto from 'crypto';

@Controller('profiles')
export class ProfilesController {

    constructor(private profileService: ProfilesService, private storageService: StorageService) {}

    @Put('/update')
    @UseGuards(JWTGuard)
    @UseInterceptors(FileInterceptor('photo'))
    async updateProfile(@UserJWT() user: Partial<User>, @UploadedFile(new ParseFilePipe({ validators: [new MaxFileSizeValidator({ maxSize: 1000000 }), new FileTypeValidator({ fileType: 'image/[jpeg,png]'})] })) file: Express.Multer.File, @Body() data: UpdateProfileDTO) {
        let filename = '';

        if (file) {
            const [_, format] = file.mimetype.split('/');
            filename = crypto.randomBytes(24).toString('hex')+'.'+format;

            this.storageService.uploadFile(file.buffer, filename);
        }

        return this.profileService.saveProfile(user.id, data.bio, data.birthday, filename);
    }

    @Get('/me')
    @UseGuards(JWTGuard)
    getProfile(@UserJWT() user: Partial<User>) {
        return this.profileService.getProfile(user.id);
    }
}
