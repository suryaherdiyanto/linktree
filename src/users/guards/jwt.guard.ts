import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Request } from "express";
import { Observable } from "rxjs";
import * as Jwt from 'jsonwebtoken';

@Injectable()
export class JWTGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest<Request>();
        const bearerToken = request.headers.authorization;

        if (!bearerToken) {
            throw new UnauthorizedException("Unauthenticated");
        }

        const [_, token] = bearerToken.split(' ');

        try {
            const decodedUser = Jwt.verify(token, 'verysecretkey');

            request['user'] = decodedUser;

            return true;
        } catch (error) {
            throw new UnauthorizedException("Invalid Token");
        }
    }
}