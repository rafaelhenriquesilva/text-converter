import { PostgresQueryAdapter } from '../../../../../src/infra/adapters/postgres-query-adapter'
describe('Insert Query Util Mehods', () => {


  it('create a insert query any returning', () => {
    const query = PostgresQueryAdapter.insert({
      fields: [[{
        name: 'field1',
        value: 10
      },
      {
        name: 'field2',
        value: 'test'
      },
      {
        name: 'field3',
        value: true
      }]],
      table: 'mockTable'
    })

    expect(query.includes('INSERT INTO mockTable')).toBe(true)
    expect(query.includes('(field1,field2,field3)')).toBe(true)
    expect(query.includes(`VALUES (10,'test',true)`)).toBe(true)
    expect(query.includes(`RETURNING`)).toBe(false)
  })

  it('should throw error when trying to create an insert query with empty fields', () => {
    const invokeInsert = () => PostgresQueryAdapter.insert({
      fields: [],
      table: 'mockTable'
    })

    expect(invokeInsert).toThrow('Insert many query needs at least one set of fields.')
  })

  it('should throw error when trying to create an insert query with undefined values on fields', () => {
    const invokeInsert = () => PostgresQueryAdapter.insert({
      fields: [[{
        name: 'field3',
        value: undefined
      }]],
      table: 'mockTable'
    })

    expect(invokeInsert).toThrow('All field sets must have the same number of fields.')
  })


})