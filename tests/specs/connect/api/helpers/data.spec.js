/**
 * This file is part of the Ingram Micro Cloud Blue Connect Zapier Extension.
 *
 * @copyright (c) 2020 Ingram Micro, Inc. All Rights Reserved.
 */


const {
  sanitizeIds,
  sanitizeItems,
  sanitizeParams,
  paramDictToArray,
  paramErrorDictToArray,
  filtersToQuery,
  processStructuredParams,
} = require('../../../../../lib/connect/api/helpers/data');

describe('helpers.data', () => {
  const toSanitize = [
    {
      myid: 'data',
      value: 'val1',
      otherValue: 'val2',
    }
  ];
  it('sanitizeIds rename the id field to "id"', () => {
    const sanitized = sanitizeIds(toSanitize, 'myid');
    expect(sanitized).toBeInstanceOf(Array);
    expect(sanitized).toHaveLength(1);
    expect(sanitized[0]).toHaveProperty('id');
    expect(sanitized[0]).not.toHaveProperty('myid');
    expect(sanitized[0].id).toEqual('data');
  });
  it('sanitizeIds throws an error if the id field does not exists', () => {
    expect(() => sanitizeIds(toSanitize, 'nonexistentid')).toThrow();
  });
  it('sanitizeParams rename param_id field to id', () => {
    const sanitized = sanitizeParams([
      {
        param_id: 'my_param',
        value: 'value'
      }
    ]);
    expect(sanitized).toBeInstanceOf(Array);
    expect(sanitized).toHaveLength(1);
    expect(sanitized[0]).toHaveProperty('id');
    expect(sanitized[0]).toHaveProperty('value');
    expect(sanitized[0]).not.toHaveProperty('param_id');
    expect(sanitized[0].id).toEqual('my_param');
  });
  it('sanitizeItems rename item_id field to id', () => {
    const sanitized = sanitizeItems([
      {
        item_id: 'my_item',
        quantity: 3
      }
    ]);
    expect(sanitized).toBeInstanceOf(Array);
    expect(sanitized).toHaveLength(1);
    expect(sanitized[0]).toHaveProperty('id');
    expect(sanitized[0]).toHaveProperty('quantity');
    expect(sanitized[0]).not.toHaveProperty('item_id');
    expect(sanitized[0].id).toEqual('my_item');
    expect(sanitized[0].quantity).toEqual(3);
  });
  it('paramDictToArray convert a key/value object to an array of {id, value} objects', () => {
    const array = paramDictToArray({id: 'value'});
    expect(array).toBeInstanceOf(Array);
    expect(array).toHaveLength(1);
    expect(array[0]).toEqual({id: 'id', value: 'value'});
  });
  it('paramErrorDictToArray convert a key/value object to an array of {id, value_error} objects', () => {
    const array = paramErrorDictToArray({id: 'value_error'});
    expect(array).toBeInstanceOf(Array);
    expect(array).toHaveLength(1);
    expect(array[0]).toEqual({id: 'id', value_error: 'value_error'});
  });
  const map = {
    product_id: 'asset.product.id',
    product_name: 'asset.product.name',
  };
  const filtersNonNull = {product_id: 'product_id', product_name: 'product_name'};
  const filtersNonNullExpected = {'asset.product.id': 'product_id', 'asset.product.name': 'product_name'};
  const filtersNull = {product_id: 'product_id', product_name: null};
  const filtersNullExpected = {'asset.product.id': 'product_id'};
  it.each([
    ['without null values', filtersNonNull, filtersNonNullExpected],
    ['with null values', filtersNull, filtersNullExpected],
  ])('filtersToQuery map filter names to fields %s', (testcase, data, expected) => {
    expect(filtersToQuery(data, map)).toEqual(expected);
  });
  it('processStructuredParams convert JSON value to structured_value', () => {
    const params = [
      {
        id: 'p1',
        value: 'string',
      },
      {
        id: 'p2',
        value: 33,
      },
      {
        id: 'p3',
        value: '{"a": "hello", "b": 10, "c": true}',
      },   
    ];
    const expected = [
      {
        id: 'p1',
        value: 'string',
      },
      {
        id: 'p2',
        value: 33,
      },
      {
        id: 'p3',
        structured_value: {
          a: "hello",
          b: 10,
          c: true
        },
      },    
    ];
    expect(processStructuredParams(params)).toEqual(expected);
  });
});