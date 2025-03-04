import { IsDecimal, IsNumber, IsPositive, IsString } from "class-validator";

export class UpdateProductRequest
{
    @IsString()   readonly nome?:          string;
    @IsString()   readonly codigo_barras?: string;
    @IsNumber()   readonly quantidade?:    number;
    @IsPositive() readonly preco?:         number;
}
