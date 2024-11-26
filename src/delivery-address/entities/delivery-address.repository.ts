import { CustomRepository } from "src/common/typeorm/custom.decorator";
import { Repository } from "typeorm";
import { DeliveryAddress } from "./delivery-address.entity";
import { IDeliveryAddressRepository } from "./delivery-address.interface";

@CustomRepository(DeliveryAddress)
export class DeliveryAddressRepository extends Repository<DeliveryAddress> implements IDeliveryAddressRepository {

}