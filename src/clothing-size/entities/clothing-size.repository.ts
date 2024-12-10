import { CustomRepository } from 'src/common/typeorm/custom.decorator';
import { Repository } from 'typeorm';
import { ClothingSize } from './clothing-size.entity';
import { IClothingSizeRepository } from './clothing-size.repository.interface';

@CustomRepository(ClothingSize)
export class ClothingSizeRepository extends Repository<ClothingSize> implements IClothingSizeRepository {}
