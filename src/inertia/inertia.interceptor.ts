import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { Request, Response } from "express";
import { Observable, map } from "rxjs";

interface InertiaPage {
    component: string,
    props: ComponentProps,
    url: string,
    version: string
}

type ComponentProps = Record<string, unknown>;

export class InertiaInterceptor implements NestInterceptor {
    constructor(private page: string) {}
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
        const request: Request = context.switchToHttp().getRequest();
        const response: Response = context.switchToHttp().getResponse();
        const component = this.page;

        let pageComponent = Object.create({});
		const isPartialReload = request.header('X-Inertia-Partial-Component') && request.header('X-Inertia-Partial-Data');

        if (request.header('X-Inertia')) {
            response.setHeader("X-Inertia", "true");
        }

        return next.handle().pipe(map((data) => {
            if (isPartialReload) {
                const partialData = request.header('X-Inertia-Partial-Data') as string;
                partialData.split(',').forEach((value) => {
                    return Object.assign(pageComponent, { [value]: data[value] });
                });
            } else {
                Object.assign(pageComponent, data);
            }

            const page: InertiaPage = {
                component,
                props: {
                    ...pageComponent,
                },
                url: request.path,
                version: '1',
            };

            return page;
        }));
    }
}