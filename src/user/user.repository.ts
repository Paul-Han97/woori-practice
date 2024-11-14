import { CustomRepository } from "src/common/typeorm/custom-decorator";
import { Repository } from "typeorm";
import { User } from "./user.entity";
import { IUserRepository } from "./user.interface";
import { Global } from "@nestjs/common";

@CustomRepository(User)
export class UserRepository extends Repository<User> {
    async testSave(user: User): Promise<User> {
        user.name = '테스트 이름'
        return await this.save(user);
    }
}