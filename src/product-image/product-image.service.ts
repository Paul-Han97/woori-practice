import { Injectable } from '@nestjs/common';
import { IProductImageService } from './product-image.service.interface';

@Injectable()
export class ProductImageService implements IProductImageService {}
