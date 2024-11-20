import { Repository } from "typeorm";
import { DeliveryAddress } from "./delivery-address.entity";

export interface IDeliveryAddressRepository extends Repository<DeliveryAddress> {
    
}