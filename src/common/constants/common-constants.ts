export const CUSTOM_REPOSITORY: string = 'CUSTOM_REPOSITORY';

export const enum GENDER_TYPE {
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
}

export const enum SUCCESS_MESSAGE {
  S001 = '',
}

export const TOKEN_SCHEMA = 'bearer';
