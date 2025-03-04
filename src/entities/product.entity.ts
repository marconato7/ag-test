import { Column                   } from "typeorm";
import { Entity                   } from "typeorm";
import { PrimaryGeneratedColumn   } from "typeorm";
import { v7 as uuidv7             } from 'uuid';
import { ColumnNumericTransformer } from "./transformers/column-numeric-transformer.transformer";

@Entity("produtos")
export class Product
{
    @PrimaryGeneratedColumn("uuid", { name: "codigo" })
    code: string;

    @Column({
        name:     "nome",
        type:     "varchar",
        length:   255,
        nullable: false,
    })
    name: string;

    @Column({
        name:     "codigo_barras",
        type:     "varchar",
        length:   255,
        nullable: true,
    })
    bar_code?: string;

    @Column({
        name:        "quantidade",
        type:        "decimal",
        nullable:    false,
        precision:   10,
        scale:       2,
        transformer: new ColumnNumericTransformer(),
    })
    quantity: number;

    @Column({
        name:        "preco",
        type:        "decimal",
        nullable:    false,
        precision:   10,
        scale:       2,
        transformer: new ColumnNumericTransformer(),
    })
    price: number;

    constructor
    (
        name:     string,
        quantity: number,
        price:    number,
        bar_code?: string
    )
    {
        this.code     = uuidv7();
        this.name     = name;
        this.bar_code = bar_code;
        this.quantity = quantity;
        this.price    = price;
    }

    public Update
    (
        name?:     string,
        bar_code?: string,
        quantity?: number,
        price?:    number,
    )
    {
        this.name     = name     ?? this.name;
        this.bar_code = bar_code ?? this.bar_code;
        this.quantity = quantity ?? this.quantity;
        this.price    = price    ?? this.price; 
    }
}
