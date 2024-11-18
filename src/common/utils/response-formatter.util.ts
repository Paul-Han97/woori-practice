import { ResponseBody } from '../type/response.type';

export class ResponseFormatter {
  public message: string;
  public data: any;

  setMessage(message: string): void {
    this.message = message;
  }

  setData(data: any): void {
    this.data = data;
  }

  createBody(): ResponseBody {
    return {
      body: {
        status: null,
        message: this.message,
        data: this.data || null,
      },
    };
  }
}
