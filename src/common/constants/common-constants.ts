export const CUSTOM_REPOSITORY: string = 'CUSTOM_REPOSITORY';

export enum GENDER_TYPE {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
}

export const enum CLOTHING_SIZE_TYPE {
  XS = 'XS',
  S = 'S',
  M = 'M',
  L = 'L',
  XL = 'XL',
  XXL = 'XXL',
}

export const enum ORDER_STATE_TYPE {
  PROCESSING = 'PROCESSING',
  IN_DELIVERY = 'IN_DELIVERY',
  COMPLETE = 'COMPLETE',
}

export const enum ERROR_MESSAGE {
  E001 = '계정을 찾을 수 없습니다.',
  E002 = '유효한 요청이 아닙니다.',
  E003 = '요청 권한이 없습니다.',
  E004 = '계정이 이미 존재합니다.',
  E005 = '인증코드가 일치하지 않습니다.',
  E006 = '이메일 또는 패스워드가 일치하지 않습니다.',
  E007 = '제품을 찾을 수 없습니다.'
}

export const enum SUCCESS_MESSAGE {
  S001 = '회원 가입이 성공적으로 완료 되었습니다.',
  S002 = `성공적으로 조회 되었습니다.`,
  S003 = '요청이 성공적으로 완료 되었습니다.'
}

export const TOKEN_SCHEMA = 'bearer';

export const HTTP_STATUS = {
  200: "OK",
  OK: 200,

  201: "Created",
  CREATED: 201,

  202: "Accepted",
  ACCEPTED: 202,

  204: "No Content",
  NO_CONTENT: 204,

  400: "Bad Request",
  BAD_REQUEST: 400,

  401: "Unauthorized",
  UNAUTHORIZED: 401,

  403: "Forbidden",
  FORBIDDEN: 403,

  404: "Not Found",
  NOT_FOUND: 404,

  415: "Unsupported Media Type",
  UNSUPPORTED_MEDIA_TYPE: 415,

  500: "Internal Server Error",
  INTERNAL_SERVER_ERROR: 500
}