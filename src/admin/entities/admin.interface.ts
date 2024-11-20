import { Repository } from "typeorm";
import { Admin } from "./admin.entity";

export interface IAdminRepository extends Repository<Admin> {
    
}