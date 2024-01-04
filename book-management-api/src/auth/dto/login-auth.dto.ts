import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class LoginAuthDto {

    @ApiProperty({
        description: "Username",
        type: String
    })
    @IsString()
    @IsNotEmpty()
    username: string;

    @ApiProperty({
        description: "Password",
        type: String
    })
    @IsString()
    @IsNotEmpty()
    password: string;
}
