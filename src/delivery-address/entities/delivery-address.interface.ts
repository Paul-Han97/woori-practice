import { Repository } from "typeorm";
import { DeliveryAddress } from "./delivery-address.entity";

export interface IDeliveryAddress extends Repository<DeliveryAddress> {
    
}