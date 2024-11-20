import { Repository } from "typeorm";
import { Gender } from "./gender.entity";
import { IGenderRepository } from "./gender.interface";
import { CustomRepository } from "src/common/typeorm/custom.decorator";

@CustomRepository(Gender)
export class GenderRepository extends Repository<Gender> implements IGenderRepository {
    
}