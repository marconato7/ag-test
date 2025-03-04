import { Body                  } from "@nestjs/common"; 
import { Inject                } from "@nestjs/common"; 
import { UnauthorizedException } from "@nestjs/common"; 
import { NotFoundException     } from "@nestjs/common";
import { Controller            } from "@nestjs/common"; 
import { Post                  } from "@nestjs/common";
import { JwtService            } from "@nestjs/jwt";
import { InjectRepository      } from "@nestjs/typeorm";
import { User                  } from "src/entities/user.entity";
import { BcryptService         } from "src/services/bcrypt.service";
import { Repository            } from "typeorm";
import { ConfigType            } from "@nestjs/config";

import jwtConfig from "src/config/jwt.config";
import { Public } from "src/decorators/is-public.decorator";
import { SignInRequest } from "./dtos/users/sign-in/sign-in.dto";
import { SignUpRequest } from "./dtos/users/sign-up/sign-up.dto";

@Controller()
export class UsersController
{
    constructor
    (
        @Inject(jwtConfig.KEY)  private readonly _jwtConfiguration: ConfigType<typeof jwtConfig>,
        @InjectRepository(User) private readonly _userRepository:   Repository<User>,
                                private readonly _bcryptService:    BcryptService,
                                private readonly _jwtService:       JwtService,
    ) {}

    @Public()
    @Post("api/users/signup")
    async SignUp(@Body() request: SignUpRequest) : Promise<any>
    {
        const passwordHash = await this._bcryptService.hash(request.password);

        const userToCreate = new User
        (
            request.username,
            request.email,
            passwordHash
        );

        const createdUser = await this._userRepository.save(userToCreate);

        return createdUser;
    }

    @Public()
    @Post("api/users/signin")
    async SignIn(@Body() request: SignInRequest): Promise<any>
    {
        const userToSignIn = await this._userRepository.findOneBy({ username: request.username });
        if (!userToSignIn)
        {
            throw new NotFoundException();
        }

        const passwordMatch = await this._bcryptService.compare(request.password, userToSignIn.passwordHash);
        if (!passwordMatch)
        {
            throw new UnauthorizedException();
        }

        const tokenTtl = this._jwtConfiguration.accessTokenTtl
            ? parseInt(this._jwtConfiguration.accessTokenTtl)
            : 3600;

        const token = await this._jwtService.signAsync
        (
            {
                sub:      userToSignIn.id,
                username: userToSignIn.username,
                email:    userToSignIn.email
            },
            {
                audience:  this._jwtConfiguration.audience,
                issuer:    this._jwtConfiguration.issuer,
                secret:    this._jwtConfiguration.secret,
                expiresIn: tokenTtl,
            }
        );

        return {
            access_token: token
        };
    }
}
