import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, Max, Min } from 'class-validator';

export class GetProductFilterDto {
  @ApiPropertyOptional({default: 1})
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  page: number;
  
  @ApiPropertyOptional({default: 9})
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @Max(15)
  take: number;
}
