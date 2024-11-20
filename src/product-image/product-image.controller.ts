import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductImageService } from './product-image.service';
import { CreateProductImageDto } from './dto/create-product-image.dto';
import { UpdateProductImageDto } from './dto/update-product-image.dto';

@Controller('product-image')
export class ProductImageController {
  constructor(private readonly productImageService: ProductImageService) {}
}
