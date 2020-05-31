import { Query } from '../src/query-builder';

describe('Test Query Builder', () => {
  it('Should build exact filter', () => {
    const query = new Query();
    query.fieldEqual('age', 18);
    expect(query.toString()).toEqual('age=18');
  });

  it('Should build GT filter', () => {
    const query = new Query();
    query.fieldGreaterThan('age', 18);
    expect(query.toString()).toEqual('age__gt=18');
  });

  it('Should build not filter', () => {
    const query = new Query();
    query.fieldGreaterThanOrEqual('age', 18, true);
    expect(query.toString()).toEqual('age__not__gte=18');
  });

  it('Should build between filter', () => {
    const query = new Query();
    query.fieldBetween('age', 18, 45);
    expect(query.toString()).toEqual('age__between=18,45');
  });

  it('Should build ORDER filter', () => {
    const query = new Query();
    query
      .fieldBetween('age', 18, 45)
      .orderBy('name', 'ASC')
      .orderBy('size', 'DESC');
    expect(query.toString()).toEqual('age__between=18,45&order=+name,-size');
  });

  it('Should set relations', () => {
    const query = new Query();
    query.fieldBetween('age', 18, 45).join(['posts', 'photos']);
    expect(query.toString()).toEqual('age__between=18,45&join=posts,photos');
  });

  it('Should set fields selections', () => {
    const query = new Query();
    query.fieldBetween('age', 18, 45).select(['name', 'size']);
    expect(query.toString()).toEqual('age__between=18,45&select=name,size');
  });

  it('Should take into account the fields in depth', () => {
    const query = new Query();
    query.fieldEqual('address.postCode', 1845);
    expect(query.toString()).toEqual('address.postCode=1845');
  });

  it('Should build chained filters', () => {
    const query = new Query();
    query
      .fieldGreaterThanOrEqual('age', 18, true)
      .fieldContains('name', 'justkey')
      .fieldIn('size', [144, 165, 95]);
    expect(query.toString()).toEqual(
      'age__not__gte=18&name__contains=justkey&size__in=144,165,95'
    );
  });

  it('Should build OR operator', () => {
    const baseQuery = new Query();
    baseQuery.fieldBetween('age', 18, 45);

    const q2 = new Query();
    q2.fieldEndsWith('name', 'ey').fieldGreaterThan('size', 18);

    const q3 = new Query();
    q3.fieldContains('name', 'just');

    baseQuery.orWhere(q2, q3);
    expect(baseQuery.toString()).toEqual(
      'age__between=18,45&$or=name__endswith:ey|size__gt:18&$or=name__contains:just'
    );
  });
});
