import { ApiProperty, ApiResponseProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class CreateDeliveryAddressDto {
    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsString()
    address: string;

    @ApiResponseProperty()
    rank: number;
}
