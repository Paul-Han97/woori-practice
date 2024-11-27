import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsNumber,
  IsPhoneNumber,
  IsString,
  IsUUID,
  Min,
  ValidateNested,
} from 'class-validator';

class ProductList {
  @ApiProperty()
  @IsUUID()
  productId: string;

  @ApiProperty()
  @IsNumber()
  @Min(1)
  count: number;
}

export class CreateOrderDto {
  @ApiProperty()
  @IsString()
  recipient: string;

  @ApiProperty()
  @IsString()
  @IsPhoneNumber('KR')
  recipientPhone: string;

  @ApiProperty()
  @IsUUID()
  deliveryAddressId: string;

  @ApiProperty({ isArray: true, type: ProductList })
  @ValidateNested({ each: true })
  @Type(() => ProductList)
  @ArrayMinSize(1)
  productList: ProductList[];
}
