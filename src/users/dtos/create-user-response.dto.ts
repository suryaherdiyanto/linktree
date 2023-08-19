import {Exclude, Expose} from "class-transformer";

export class CreateUserResponseDTO {
	@Exclude()
	id: string;

	@Exclude()
	password: string;

	@Expose()
	email: string;

	@Expose()
	username: string;

	@Expose()
	name: string;
}
