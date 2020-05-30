import { QueryBuilder } from '../src/query-builder';

describe('Test Query Builder', () => {
  it('Should transform the simple query as an object into a query string', () => {
    const queryBuilder = new QueryBuilder({
      name__contains: 'foo',
      role__in: 'admin,common',
      age__gte: 18,
      page: 3,
      limit: 10
    });
    expect(queryBuilder.toQueryString()).toEqual(
      'name__contains=foo&role__in=admin,common&age__gte=18&page=3&limit=10'
    );
  });
});
