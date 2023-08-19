import {CallHandler, ExecutionContext, Injectable, NestInterceptor} from "@nestjs/common";
import {plainToClass} from "class-transformer";
import {map, Observable} from "rxjs";
import {CreateUserResponseDTO} from "../dtos/create-user-response.dto";

@Injectable()
export class CreateUserInterceptor implements NestInterceptor {
	intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
		return next.handle().pipe(map(({ message, data }) => ({message, data: plainToClass(CreateUserResponseDTO, data)}) ));
	}
}
