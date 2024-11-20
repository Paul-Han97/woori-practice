import { Repository } from 'typeorm';
import { ClothingSize } from './clothing-size.entity';

export interface IClothingSizeRepository extends Repository<ClothingSize> {}
