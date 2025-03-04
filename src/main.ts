import { NestFactory          } from "@nestjs/core";
import { AppModule            } from "./app.module";
import { ValidationPipe       } from "@nestjs/common";
import { DocumentBuilder      } from "@nestjs/swagger";
import { SwaggerCustomOptions } from "@nestjs/swagger";
import { SwaggerModule        } from "@nestjs/swagger";

async function bootstrap()
{
    const app = await NestFactory.create(AppModule);

    app.useGlobalPipes
    (
        new ValidationPipe
        ({
            forbidNonWhitelisted: true,
            transform:            true,
            whitelist:            true,
        })
    );

    const config = new DocumentBuilder()
        .setTitle("ag-test")
        .setDescription("includes a product api + users api")
        .setVersion("1.0")
        .addTag("ag-test")
        .build();

    const documentFactory = () => SwaggerModule.createDocument(app, config);

    const swaggerCustomOptions: SwaggerCustomOptions = {
        ui:  true,
        raw: [ "json", "yaml" ],
     };

    SwaggerModule.setup("openapi", app, documentFactory, swaggerCustomOptions);

    await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
