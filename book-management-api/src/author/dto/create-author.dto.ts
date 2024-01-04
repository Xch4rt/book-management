import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsNotEmpty, IsOptional, IsString } from "class-validator";


export class CreateAuthorDto {
    @ApiProperty({
        description: "Name of the author",
        type: String
    })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        description: "Date of birth of the author",
        type: String
    })
    @IsString()
    birthDay?: string

    @ApiProperty({
        description: "Place of birth of the author",
        type: String,
        required: false,
    })
    @IsString()
    birthPlace?: string;
}
