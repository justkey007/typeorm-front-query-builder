<p align="center">
  Easily transform an url query into TypeORM query
  <br>
  <br>
  <img src="https://circleci.com/gh/justkey007/typeorm-server-query-builder/tree/master.svg?style=svg">
  <br>
  <br>
  <a href="https://codecov.io/gh/rjlopezdev/typeorm-express-query-builder">
  <img src="https://codecov.io/gh/rjlopezdev/typeorm-express-query-builder/branch/master/graph/badge.svg" />
  </a>
  <img src="https://badge.fury.io/js/typeorm-server-query-builder.svg">
  <img src="https://img.shields.io/badge/license-MIT-green.svg">
  <br>
  <br>
</p>

# TypeORM Express Query Builder
This library allows you to transfrom automatically _url query_ into TypeORM findOptions queries.

## Installation

`npm install typeorm-server-query-builder`


## How it works?

![](https://raw.githubusercontent.com/justkey007/typeorm-server-query-builder/master/typeorm-express-pipeline.png)


## Usage

Use QueryBuilder export from package and pass your `req.query` as an argument:

```typescript
import QueryBuilder from 'typeorm-server-query-builder';

const builder = new QueryBuilder(req.query);
const builtQuery = builder.build();
// Now your query is built, pass it to your TypeORM repository
const results = await fooRepository.find(builtQuery);
```

Given the following url query string:

`foo/?name__contains=foo&role__in=admin,common&age__gte=18&page=3&limit=10`

It will be transformed into:

```typescript
{
  where: {
    foo: Like('%foo%'),
    role: In(['admin', 'common']),
    age: MoreThanOrEqual(18)
  },
  skip: 20,
  take: 10
}
```

## Different ways of retrieve data

### GET, POST method by url query string

`GET foo/?name__contains=foo&role__in=admin,common&age__gte=18&page=3&limit=10`

`POST foo/?name__contains=foo&role__in=admin,common&age__gte=18&page=3&limit=10`
```javascript
app.get('/foo', (req, res) => {
  const queryBuilder = new QueryBuilder(req.query); // => Parsed into req.query
  const built = queryBuilder.build();
})
```

### POST method by body

```javascript
POST foo/, body: {
  "name__contains": "foo",
  "role__in": "admin,common",
  "age__gte": 18,
  "page": 3,
  "limit": 10
}
```

```javascript
app.post('/foo', (req, res) => {
  const queryBuilder = new QueryBuilder(req.body); // => Parsed into req.body
  const built = queryBuilder.build();
})
```

## Available Lookups

| Lookup | Behaviour | Example |
| --- | --- | --- |
_(none)_ | Return entries that match with value | `foo=raul`
__contains__ | Return entries that contains value | `foo__contains=lopez`
__startswith__ | Return entries that starts with value | `foo__startswith=r`
__endswith__ | Return entries that ends with value | `foo__endswith=dev`
__isnull__ | Return entries with null value | `foo__isnull`
__lt__ | Return entries with value less than or equal to provided | `foo__lt=18`
__lte__ | Return entries with value less than provided | `foo__lte=18`
__gt__ | Returns entries with value greater than provided | `foo__gt=18`
__gte__ | Return entries with value greater than or equal to provided | `foo__gte=18`
__in__ | Return entries that match with values in list | `foo__in=admin,common`
__between__ | Return entries in range | `foo__between=1,27`

### Notice

You can use negative logic prefixing lookup with `__not`. *Example:* `foo__not__contains=value`

Querying a column from an embedded entity. *Example*: `user.name=value`

## OR condition union
```typescript
// ?$or=name:juste|age__gte:15&$or=user.role:admin
{
  where: [
    { name: 'juste', age: MoreThanOrEqual('15') },
    { user: { role: 'admin' } }
  ]
}

// ?city=Dahomey&$or=name:juste|age__gte:15&$or=user.role:admin
{
  where: [
    { name: 'juste', city: 'Dahomey', age: MoreThanOrEqual('15') },
    { user: { role: 'admin' }, city: 'Dahomey' }
  ]
}
```
## Options

| Option | Default | Behaviour | Example |
| --- | :---: | --- | --- |
pagination | __true__ | If _true_, paginate results. If _false_, disable pagination | `pagination=false`
page | __1__ | Return entries for page `page` | `page=2`
limit | __25__ | Return entries for page `page` paginated by size `limit` | `limit=15`
order | - | Order for fields:<br>`+`: Ascendant <br> `-`: Descendant | `order=+foo,-name,+surname`
join | - | Set relations | `join=posts,comments`
select | - | Set fields selection | `select=name,phoneNumber`

