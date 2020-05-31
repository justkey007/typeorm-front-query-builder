<p align="center">
  Easily build requests on url for your server which uses <a href="https://github.com/justkey007/typeorm-server-query-builder"> typeorm-server-query-builder</a>.
  <br>
  <br>
  <img src="https://circleci.com/gh/justkey007/typeorm-front-query-builder/tree/master.svg?style=svg">
  <br>
  <br>
  <img src="https://badge.fury.io/js/typeorm-front-query-builder.svg">
  <img src="https://img.shields.io/badge/license-MIT-green.svg">
  <br>
  <br>
</p>

# TypeORM Frontend Query Builder
This library allows you to build _url string query_ for <a href="https://github.com/justkey007/typeorm-server-query-builder">typeorm-server-query-builder</a>.

## Installation

`npm install typeorm-front-query-builder`

## Usage

```typescript
import { Query } from 'typeorm-front-query-builder';

const query = new Query();
query.fieldBetween('age', 18, 45).join(['posts', 'photos']);

const urlQuery = query.toString();
// age__between=18,45&relations=posts,photos
```

## Available Lookups

| Lookup | Method |
| --- | --- |
_(none)_ | `fieldEqual(field: string, value: Primitive, not = false): Query`
__contains__ | `fieldContains(field: string, value: Primitive, not = false): Query`
__startswith__ | `fieldStartsWith(field: string, value: Primitive, not = false): Query`
__endswith__ | `fieldEndsWith(field: string, value: Primitive, not = false): Query`
__isnull__ | `fieldIsNull(field: string, not = false): Query`
__lt__ | `fieldLessThan(field: string, value: Primitive, not = false): Query`
__lte__ | `fieldLessThanOrEqual(field: string, value: Primitive, not = false): Query`
__gt__ | `fieldGreaterThan(field: string, value: Primitive, not = false): Query`
__gte__ | `fieldGreaterThanOrEqual(field: string, value: Primitive, not = false): Query`
__in__ | `fieldIn(field: string, elements: Array<Primitive>, not = false): Query`
__between__ | `fieldBetween(field: string, firstValue: string | number, lastValue: string | number, not = false): Query`

## Options

| Option | Default |
| --- | --- |
pagination | `[enable|disable]Pagnination(): Query`
page | `setPage(page: number): Query`
limit | `setLimit(limit: number): Query`
order | `orderBy(field: string, by: 'ASC' | 'DESC'): Query`
join | `join(relations: string[]): Query`
select | `select(fields: string[]): Query`

## Others methods

### Get a raw request object to pass it to an http POST request body for example
```typescript
public getRawObject(): object
```
### Get the query string to form a query on url (?)
```typescript
public toString(): string
```