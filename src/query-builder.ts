import { LookupFilter, Operator } from './lookup.enum';

type Primitive = string | number | boolean;

export class Query {
  private queryObject: any;

  constructor(queryObject: object = {}) {
    this.queryObject = queryObject;
  }

  public fieldContains(field: string, value: Primitive, not = false): Query {
    this.queryObject[
      `${field}__${not ? LookupFilter.NOT + '__' : ''}${LookupFilter.CONTAINS}`
    ] = value;
    return this;
  }

  public fieldIn(
    field: string,
    elements: Array<Primitive>,
    not = false
  ): Query {
    this.queryObject[
      `${field}__${not ? LookupFilter.NOT + '__' : ''}${LookupFilter.IN}`
    ] = elements.join(',');
    return this;
  }

  public fieldEqual(field: string, value: Primitive, not = false): Query {
    this.queryObject[`${field}${not ? '__' + LookupFilter.NOT : ''}`] = value;
    return this;
  }

  public fieldIsNull(field: string, not = false): Query {
    this.queryObject[
      `${field}__${not ? LookupFilter.NOT + '__' : ''}${LookupFilter.IS_NULL}`
    ] = true;
    return this;
  }

  public fieldGreaterThan(field: string, value: Primitive, not = false): Query {
    this.queryObject[
      `${field}__${not ? LookupFilter.NOT + '__' : ''}${LookupFilter.GT}`
    ] = value;
    return this;
  }

  public fieldGreaterThanOrEqual(
    field: string,
    value: Primitive,
    not = false
  ): Query {
    this.queryObject[
      `${field}__${not ? LookupFilter.NOT + '__' : ''}${LookupFilter.GTE}`
    ] = value;
    return this;
  }

  public fieldLessThan(field: string, value: Primitive, not = false): Query {
    this.queryObject[
      `${field}__${not ? LookupFilter.NOT + '__' : ''}${LookupFilter.LT}`
    ] = value;
    return this;
  }

  public fieldLessThanOrEqual(
    field: string,
    value: Primitive,
    not = false
  ): Query {
    this.queryObject[
      `${field}__${not ? LookupFilter.NOT + '__' : ''}${LookupFilter.LTE}`
    ] = value;
    return this;
  }

  public fieldStartsWith(field: string, value: Primitive, not = false): Query {
    this.queryObject[
      `${field}__${not ? LookupFilter.NOT + '__' : ''}${
        LookupFilter.STARTS_WITH
      }`
    ] = value;
    return this;
  }

  public fieldEndsWith(field: string, value: Primitive, not = false): Query {
    this.queryObject[
      `${field}__${not ? LookupFilter.NOT + '__' : ''}${LookupFilter.ENDS_WITH}`
    ] = value;
    return this;
  }

  public fieldBetween(
    field: string,
    firstValue: string | number,
    lastValue: string | number,
    not = false
  ): Query {
    this.queryObject[
      `${field}__${not ? LookupFilter.NOT + '__' : ''}${LookupFilter.BETWEEN}`
    ] = `${firstValue},${lastValue}`;
    return this;
  }

  public orWhere(...subQueries: Query[]): Query {
    if (!this.queryObject[Operator.OR]) {
      this.queryObject[Operator.OR] = [];
    }
    subQueries.forEach(subQuery => {
      this.queryObject[Operator.OR].push(
        this.stringifyORCondition(subQuery.getRawObject())
      );
    });
    return this;
  }

  public disablePagnination(): Query {
    this.queryObject.pagination = false;
    return this;
  }

  public enablePagnination(): Query {
    this.queryObject.pagination = true;
    return this;
  }

  public setPage(page: number): Query {
    this.queryObject.page = page;
    return this;
  }

  public setLimit(limit: number): Query {
    this.queryObject.limit = limit;
    return this;
  }

  public join(relations: string[]): Query {
    this.queryObject.join = relations.join(',');
    return this;
  }

  public select(fields: string[]): Query {
    this.queryObject.select = fields.join(',');
    return this;
  }

  public orderBy(field: string, by: 'ASC' | 'DESC'): Query {
    if (!this.queryObject.order) this.queryObject.order = '';
    this.queryObject.order += `${this.queryObject.order ? ',' : ''}${
      by === 'ASC' ? '+' : '-'
    }${field}`;
    return this;
  }

  public toString(): string {
    if (!this.queryObject) return '';
    let result = '';
    for (const key in this.queryObject) {
      if (this.queryObject.hasOwnProperty(key)) {
        const value = this.queryObject[key];
        if (result) result += '&';
        if (Array.isArray(value)) {
          value.forEach((val, index) => {
            result += `${key}=${val}${index !== value.length - 1 ? '&' : ''}`;
          });
        } else {
          result += `${key}=${value}`;
        }
      }
    }
    return result;
  }

  public getRawObject(): object {
    return this.queryObject;
  }

  private stringifyORCondition(query: object): string {
    let result = '';
    for (const key in query) {
      if (query.hasOwnProperty(key)) {
        const value = query[key];
        result += `${key}:${value}|`;
      }
    }
    return result.substr(0, result.length - 1);
  }
}
