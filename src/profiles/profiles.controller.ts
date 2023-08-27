import { Body, Controller, Put, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { JWTGuard } from '../users/guards/jwt.guard';
import { ProfilesService } from './profiles.service';
import { User as UserJWT } from '../users/decorators/jwt-user.decorator';
import { User } from '../users/users.entity';
import { UpdateProfileDTO } from './dtos/update-profile.dto';
import { StorageService } from 'src/storage/storage.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('profiles')
export class ProfilesController {

    constructor(private profileService: ProfilesService, private storageService: StorageService) {}

    @Put('/update')
    @UseGuards(JWTGuard)
    @UseInterceptors(FileInterceptor('photo'))
    async updateProfile(@UserJWT() user: Partial<User>, @UploadedFile() file: Express.Multer.File, @Body() data: UpdateProfileDTO) {
        const upload = await this.storageService.uploadFile(file.buffer, 'test');
        console.log(upload);
        return this.profileService.saveProfile(user.id, data.bio, data.birthday);
    }
}
