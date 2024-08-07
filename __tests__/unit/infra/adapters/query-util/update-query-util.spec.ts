import {PostgresQueryAdapter} from '../../../../../src/infra/adapters/postgres/postgres-query-adapter'
describe('Update Query Util Mehods', () =>  {
  it('create a update query with where equal', () => {
    const query = PostgresQueryAdapter.update({
      fields: [{
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
      }],
      table: 'mockTable',
      where: [
        {
          name: 'id',
          value: 1
        }
      ]
    })
    expect(query.includes('UPDATE mockTable SET')).toBe(true)
    expect(query.includes('field1 = 10')).toBe(true)
    expect(query.includes(`field2 = 'test'`)).toBe(true)
    expect(query.includes(`field3 = true`)).toBe(true)
    expect(query.includes(`WHERE id = 1`)).toBe(true)
  })

  it('create a update query with where not equal', () => {
    const query = PostgresQueryAdapter.update({
      fields: [{
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
      }],
      table: 'mockTable',
      where: [
        {
          name: 'id',
          equal: false,
          value: 1
        }
      ]
    })
    expect(query.includes('UPDATE mockTable SET')).toBe(true)
    expect(query.includes('field1 = 10')).toBe(true)
    expect(query.includes(`field2 = 'test'`)).toBe(true)
    expect(query.includes(`field3 = true`)).toBe(true)
    expect(query.includes(`WHERE id != 1`)).toBe(true)
  })


  it('should throw error when trying to create an update query with empty fields', () => {
    const invokeUpdate = () => PostgresQueryAdapter.update({
      fields: [],
      table: 'mockTable',
      where: [
        {
          name: 'id',
          value: 1
        }
      ]
    })

    expect(invokeUpdate).toThrow('UPDATE query needs at least one field. Verify if the fields have correct values!')
  })

  it('should throw error when trying to create an update query with undefined values fields', () => {
    const invokeUpdate = () => PostgresQueryAdapter.update({
      fields: [{
        name: 'field1',
        value: undefined
      }],
      table: 'mockTable',
      where: [
        {
          name: 'id',
          value: 1
        }
      ]
    })

    expect(invokeUpdate).toThrow('UPDATE query needs at least one field. Verify if the fields have correct values!')
  })
  

  it('should throw error when trying to create an update query with empty fields on where condition', () => {
    const invokeUpdate = () => PostgresQueryAdapter.update({
      fields: [{
        name: 'field1',
        value: 10
      }],
      table: 'mockTable',
      where: []
    })

    expect(invokeUpdate).toThrow('UPDATE query needs at least one field on where condition. Verify if the fields have correct values!')
  })

  it('should throw error when trying to create an update query with fields with undefined value on where condition', () => {
    const invokeUpdate = () => PostgresQueryAdapter.update({
      fields: [{
        name: 'field1',
        value: 10
      }],
      table: 'mockTable',
      where: [{
        name: 'test',
        value: undefined
      }]
    })

    expect(invokeUpdate).toThrow('UPDATE query needs at least one field on where condition. Verify if the fields have correct values!')
  })

})