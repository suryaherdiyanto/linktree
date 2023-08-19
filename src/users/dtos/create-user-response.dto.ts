import {Exclude} from "class-transformer";

export class CreateUserResponseDTO {
	@Exclude()
	id: string;

	@Exclude()
	password: string;
}
