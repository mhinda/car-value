import { CallHandler, ExecutionContext, NestInterceptor, UseInterceptors } from "@nestjs/common";
import { plainToClass } from "class-transformer";
import { Observable, map } from "rxjs";

interface ClassContructor {
    new (...args: any[]): {};
}

export function Serialize(dto: ClassContructor) {
    return UseInterceptors(new CustomSerializerInterceptor(dto))
}

export class CustomSerializerInterceptor implements NestInterceptor {
    constructor(private dto: any){}
    
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        // Run something before request is handled
        return next.handle().pipe(
            map((data: any) => {
                // Run something before response is sent
                return plainToClass(this.dto, data, {
                    excludeExtraneousValues: true,
                })
            })
        )
    }
}