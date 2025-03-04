import { IsNumber   } from "class-validator";
import { IsPositive } from "class-validator";
import { IsString   } from "class-validator";

export class SingleProduct
{
    @IsString()   readonly codigo:         string;
    @IsString()   readonly nome:           string;
    @IsString()   readonly codigo_barras?: string;
    @IsNumber()   readonly quantidade:     number;
    @IsPositive() readonly preco:          number;

    constructor
    (
        codigo:         string,
        nome:           string,
        quantidade:     number,
        preco:          number,
        codigo_barras?: string
    )
    {
        this.codigo        = codigo;
        this.nome          = nome;
        this.codigo_barras = codigo_barras;
        this.quantidade    = quantidade;
        this.preco         = preco;
    }
}
