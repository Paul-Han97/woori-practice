import { Repository } from "typeorm";
import { OrderState } from "./order-state.entity";

export interface IOrderStateRepository extends Repository<OrderState> {

}