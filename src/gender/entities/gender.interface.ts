import { Repository } from "typeorm";
import { Gender } from "./gender.entity";

export interface IGenderRepository extends Repository<Gender> {

}