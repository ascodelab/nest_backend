/* eslint-disable prefer-const */
/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Injectable, Global } from '@nestjs/common';
@Global()
@Injectable()
export class HelperService {
  public ucword(str: string) {
    if (str) {
      str = str
        .toLowerCase()
        .replace(/(^([a-zA-Z\p{M}]))|([ -][a-zA-Z\p{M}])/g, function(
          replace_latter,
        ) {
          return replace_latter.toUpperCase();
        }); //Can use also /\b[a-z]/g
    }
    return str; //First letter capital in each word
  }
}
