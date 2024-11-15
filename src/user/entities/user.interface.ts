import { Repository } from "typeorm";
import { User } from "./user.entity";

export interface IUserRepository extends Repository<User> {
    testSave(user:User):Promise<User>;
}