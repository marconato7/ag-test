import { Column                   } from "typeorm";
import { Entity                   } from "typeorm";
import { PrimaryGeneratedColumn   } from "typeorm";
import { v7 as uuidv7             } from 'uuid';

@Entity("users")
export class User
{
    @PrimaryGeneratedColumn("uuid", { name: "id" })
    id: string;

    @Column({
        name:     "username",
        type:     "varchar",
        length:   255,
        nullable: false,
        unique:   true
    })
    username: string;

    @Column({
        name:     "email",
        type:     "varchar",
        length:   255,
        nullable: false,
        unique:   true
    })
    email: string;

    @Column({
        name:     "password_hash",
        type:     "varchar",
        length:   255,
        nullable: false,
    })
    passwordHash: string;

    constructor
    (
        username:     string,
        email:        string,
        passwordHash: string,
    )
    {
        this.id           = uuidv7();
        this.username     = username;
        this.email        = email;
        this.passwordHash = passwordHash;
    }
}
