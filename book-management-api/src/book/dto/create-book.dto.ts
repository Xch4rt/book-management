import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsDate, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested, isNotEmpty } from "class-validator";

export class CreateBookDto {
    @ApiProperty({
        description: "Name of the book",
        type: String
    })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        description: "Description of the book",
        type: String
    })
    @IsString()
    @IsNotEmpty()
    description: string;

    @ApiProperty({
        description: "Published date of the book",
        type: String
    })
    @IsString()
    @IsNotEmpty()
    datePublished: string;

    @ApiProperty({
        description: "User id that adds the book",
        type: Number
    })
    @IsNumber()
    @IsNotEmpty()
    userId: number;

    @ApiProperty({
        description: "Array of authors id that wrote the book",
        type: [Number],
        example: [1,2,3,4]
    })
    @IsNotEmpty()
    @IsArray()
    @ValidateNested({
        each: true
    })
    authorIds: number[]; 
}
