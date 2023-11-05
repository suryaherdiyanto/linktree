import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Request } from "express";
import { Observable } from "rxjs";
import * as Jwt from 'jsonwebtoken';
import { ConfigService } from "@nestjs/config";

@Injectable()
export class JWTGuard implements CanActivate {
    constructor(private configService: ConfigService) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest<Request>();
        const bearerToken = request.headers.authorization;

        if (!bearerToken) {
            throw new UnauthorizedException("Unauthenticated");
        }

        const [_, token] = bearerToken.split(' ');

        try {
            const decodedUser = Jwt.verify(token, this.configService.get<string>('JWT_SECRET', 'verysecretkey'));

            request['user'] = decodedUser;

            return true;
        } catch (error) {
            throw new UnauthorizedException("Invalid Token");
        }
    }
}