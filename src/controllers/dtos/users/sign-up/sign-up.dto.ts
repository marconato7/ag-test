import { IsString   } from "class-validator";

export class SignUpRequest
{
    @IsString() email:    string;
    @IsString() username: string;
    @IsString() password: string;
}
