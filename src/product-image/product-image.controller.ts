import { Controller, Inject } from '@nestjs/common';
import { ProductImageService } from './product-image.service';
import { IProductImageService } from './product-image.service.interface';

@Controller('product-image')
export class ProductImageController {
  constructor(
    @Inject(ProductImageService)
    private readonly productImageService: IProductImageService,
  ) {}
}
