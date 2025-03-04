import { Module             } from "@nestjs/common";
import { TypeOrmModule      } from "@nestjs/typeorm";
import { Product            } from "./entities/product.entity";
import { ProductsController } from "./controllers/products.controller";
import { BcryptService      } from "./services/bcrypt.service";
import { UsersController    } from "./controllers/users.controller";
import { User               } from "./entities/user.entity";
import { ConfigModule       } from "@nestjs/config";
import { JwtModule          } from "@nestjs/jwt";
import { APP_GUARD          } from "@nestjs/core";
import { AuthGuard          } from "./guards/auth.guard";

import jwtConfig from "./config/jwt.config";

@Module({

    imports: [

        ConfigModule.forFeature(jwtConfig),

        ConfigModule.forRoot(),

        JwtModule.registerAsync(jwtConfig.asProvider()),

        TypeOrmModule.forRoot({
            type:             "mariadb",
            host:             "mariadb",
            port:             3306,
            username:         "root",
            password:         "mariadb",
            database:         "ag_test",
            autoLoadEntities: true,
            synchronize:      false,
        }),

        TypeOrmModule.forFeature([ Product ]),

        TypeOrmModule.forFeature([ User ]),

    ],

    controllers: [
        ProductsController,
        UsersController
    ],

    providers: [
        BcryptService,
        {
            provide:  APP_GUARD,
            useClass: AuthGuard,
        },
    ],

})
export class AppModule {}
