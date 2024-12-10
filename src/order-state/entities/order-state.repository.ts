import { Repository } from "typeorm";
import { OrderState } from "./order-state.entity";
import { IOrderStateRepository } from "./order-state.repository.interface";
import { CustomRepository } from "src/common/typeorm/custom.decorator";

@CustomRepository(OrderState)
export class OrderStateRepository extends Repository<OrderState> implements IOrderStateRepository {
    
}