import { CustomRepository } from "src/common/typeorm/custom.decorator";
import { Repository } from "typeorm";
import { Admin } from "./admin.entity";

@CustomRepository(Admin)
export class AdminRepository extends Repository<Admin> {

}