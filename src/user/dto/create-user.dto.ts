import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsEnum, IsString, IsStrongPassword } from "class-validator";
import { GENDER_TYPE } from "src/common/constants/common-constants";

export class CreateUserDto {
    @ApiProperty()
    @IsString()
    name: string
    
    @ApiProperty()
    @IsEmail()
    email: string;
    
    @ApiProperty()
    @IsStrongPassword()
    password: string;
    
    @ApiProperty({enum: GENDER_TYPE})
    @IsEnum(GENDER_TYPE)
    gender: GENDER_TYPE;
}
