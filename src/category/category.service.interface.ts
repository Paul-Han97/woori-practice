import { ResponseData } from "src/common/type/response.type";

export interface ICategoryService {
    findAll(): Promise<ResponseData>
}