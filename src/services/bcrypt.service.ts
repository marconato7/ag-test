import { Injectable } from "@nestjs/common";
import { compare    } from "bcrypt";
import { genSalt    } from "bcrypt";
import { hash       } from "bcrypt";

@Injectable()
export class BcryptService
{
    async hash(data: string | Buffer): Promise<string>
    {
        const salt = await genSalt();

        return hash(data, salt);
    }

    async compare(data: string | Buffer, encrypted: string): Promise<boolean>
    {
        return compare(data, encrypted);
    }
}
