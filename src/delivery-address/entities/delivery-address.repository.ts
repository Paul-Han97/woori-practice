import { CustomRepository } from "src/common/typeorm/custom.decorator";
import { Repository } from "typeorm";
import { DeliveryAddress } from "./delivery-address.entity";

@CustomRepository(DeliveryAddress)
export class DeliveryAddressRepository extends Repository<DeliveryAddress> {

}