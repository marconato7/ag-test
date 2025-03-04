import { CanActivate           } from "@nestjs/common";
import { ExecutionContext      } from "@nestjs/common";
import { Inject                } from "@nestjs/common";
import { Injectable            } from "@nestjs/common";
import { UnauthorizedException } from "@nestjs/common";
import { JwtService            } from "@nestjs/jwt";
import { Request               } from "express";
import { Reflector             } from "@nestjs/core";
import { ConfigType            } from "@nestjs/config";
import { IS_PUBLIC_KEY         } from "src/decorators/is-public.decorator";

import jwtConfig from "src/config/jwt.config";

@Injectable()
export class AuthGuard implements CanActivate
{
    constructor
        (
            @Inject(jwtConfig.KEY) private readonly _jwtConfiguration: ConfigType<typeof jwtConfig>,
                                   private readonly _jwtService:       JwtService,
                                   private readonly _reflector:        Reflector,
        ) {}

    async canActivate(context: ExecutionContext): Promise<boolean>
    {
        const isPublic = this._reflector.getAllAndOverride<boolean>
        (
            IS_PUBLIC_KEY,
            [
                context.getHandler(),
                context.getClass(),
            ]
        );

        if (isPublic)
        {
            return true;
        }

        const request = context.switchToHttp().getRequest();

        const token = this.extractTokenFromHeader(request);
        if (!token)
        {
            throw new UnauthorizedException();
        }

        try
        {
            const payload = await this._jwtService.verifyAsync
            (
                token,
                { secret: this._jwtConfiguration.secret }
            );
        }
        catch
        {
            throw new UnauthorizedException();
        }
        
        return true;
    }

    private extractTokenFromHeader(request: Request): string | undefined
    {
        const [ type, token ] = request.headers.authorization?.split(" ") ?? [];

        return type === "Bearer" ? token : undefined;
    }
}
