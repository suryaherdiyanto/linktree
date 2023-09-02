import { TestingModule, Test } from "@nestjs/testing";
import { ProfilesController } from "./profiles.controller";
import { ProfilesService } from "./profiles.service";
import { StorageService } from "../storage/storage.service";
import { user } from "../users/stubs/users.stub";
import { largeFile, textFile, validFile } from "./stubs/file.stub";
import { BadRequestException } from "@nestjs/common";

describe('ProfilesController', () => {
    let controller: ProfilesController;

    beforeEach(async () => {

        const module: TestingModule = await Test.createTestingModule({
            controllers: [ProfilesController],
            providers: [
                {
                    provide: ProfilesService,
                    useValue: {
                        saveProfile: jest.fn().mockResolvedValue({ ...user, photo: 'test.jpg' })
                    },
                },
                {
                    provide: StorageService,
                    useValue: {
                        uploadFile: jest.fn().mockResolvedValue(() => 'test.jpg')
                    }
                }
            ]
        }).compile();

        controller = module.get<ProfilesController>(ProfilesController);
    });

    describe('updateProfile', () => {
        it('Should throw an bad request exception if file size is more than 1Mb', () => {
            expect(controller.updateProfile(user, largeFile, { bio: 'test', birthday: '1990-01-01'})).rejects.toThrow(BadRequestException);
        });

        it('should return bad request exception when the mime type is not jpg or png', () => {
            expect(controller.updateProfile(user, textFile, { bio: 'test', birthday: '1990-01-01'})).rejects.toThrow(BadRequestException);
        })

        it('should return the updated profile with a new file name if the file was valid', async () => {
            expect((await controller.updateProfile(user, validFile, { bio: 'test', birthday: '1990-01-01' })).photo).toBe('test.jpg');
        })
    })
});