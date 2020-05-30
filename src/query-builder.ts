export class QueryBuilder {
  private queryObject: object;

  constructor(queryObject?: object) {
    this.queryObject = queryObject;
  }

  public toQueryString() {
    if (!this.queryObject) return '';
    let result = '';
    for (const key in this.queryObject) {
      if (this.queryObject.hasOwnProperty(key)) {
        const value = this.queryObject[key];
        if (result) {
          result += '&';
        }
        result += `${key}=${String(value)}`;
      }
    }
    return result;
  }
}
