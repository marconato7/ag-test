import { IsNumber   } from "class-validator";
import { IsPositive } from "class-validator";
import { IsString   } from "class-validator";

export class CreateProductRequest
{
    @IsString()   nome:           string;
    @IsString()   codigo_barras?: string;
    @IsNumber()   quantidade:     number;
    @IsPositive() preco:          number;
}
