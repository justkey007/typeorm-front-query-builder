export enum LookupFilter {
  EXACT = 'exact',
  CONTAINS = 'contains',
  IS_NULL = 'isnull',
  IN = 'in',
  GT = 'gt',
  GTE = 'gte',
  LT = 'lt',
  LTE = 'lte',
  STARTS_WITH = 'startswith',
  ENDS_WITH = 'endswith',
  BETWEEN = 'between',
  NOT = 'not'
}

export enum Operator {
  OR = '$or'
}
