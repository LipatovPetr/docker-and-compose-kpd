import { Request } from 'express';
export interface JwtPayload {
    sub: number;
    username: string;
    iat?: number;
    exp?: number;
}
export interface ExtendedRequest extends Request {
    user: {
        userId: number;
        username: string;
    };
}
