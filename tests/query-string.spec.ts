import { Query } from '../src/query-builder';

describe('Test Query String Conversion', () => {
  it('Should transform the simple query as an object into a query string', () => {
    const qb = new Query({
      name__contains: 'foo',
      role__in: 'admin,common',
      age__gte: 18,
      page: 3,
      limit: 10
    });
    expect(qb.toString()).toEqual(
      'name__contains=foo&role__in=admin,common&age__gte=18&page=3&limit=10'
    );
  });

  it('Should transform the $or query as an object into a query string', () => {
    const qb = new Query({
      $or: ['name:juste|age__gte:15', 'user.role:admin'],
      city: 'Dahomey'
    });
    expect(qb.toString()).toEqual(
      '$or=name:juste|age__gte:15&$or=user.role:admin&city=Dahomey'
    );
  });
});
