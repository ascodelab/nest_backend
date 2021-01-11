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
        .replace(/(^([a-zA-Z\p{M}]))|([ -][a-zA-Z\p{M}])/g, function (
          replace_latter,
        ) {
          return replace_latter.toUpperCase();
        }); //Can use also /\b[a-z]/g
    }
    return str; //First letter capital in each word
  }
  //format article list
  public formatArticleList(list: Record<string, any>) {
    if (list.length < 0) return [];
    let counts = list.reduce(
      (
        p: { [x: string]: any; hasOwnProperty: (arg0: any) => any },
        c: { id: any; terms_name: any; categories: any[] },
      ) => {
        const id = c.id;
        if (p.hasOwnProperty(id)) {
          //t = temp variable
          const t = p[id];
          const categories = t.categories;
          if (c.terms_name != null) categories.push(c.terms_name);
          t.categories = categories;
          p[id] = t;
        } else {
          c.categories =
            c.terms_name === null ? ['Uncategorized'] : [c.terms_name];
          p[id] = c;
        }
        return p;
      },
      {},
    );
    return counts;
  }
}
