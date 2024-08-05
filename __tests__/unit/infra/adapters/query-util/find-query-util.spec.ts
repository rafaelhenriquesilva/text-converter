import {PostgresQueryAdapter} from '../../../../../src/infra/adapters/postgres/postgres-query-adapter'
describe('Find Query Util Mehods', () =>  {
  it('create a select query any where', () => {
    const query = PostgresQueryAdapter.find({
      fields: [{
        name: 'field1'
      },
      {
        name: 'field2'
      },
      {
        name: 'field3'
      }],
      table: 'mockTable'
    })

    expect(query.includes('SELECT field1,field2,field3 FROM mockTable')).toBe(true)
    expect(query.includes('WHERE')).toBe(false)
  })

  it('create a select query with where equal', () => {
    const query = PostgresQueryAdapter.find({
      fields: [{
        name: 'field1'
      },
      {
        name: 'field2'
      },
      {
        name: 'field3'
      }],
      table: 'mockTable',
      where: [
        {
          name: 'field1',
          value: "test"
        },
        {
          name: 'field2',
          value: true
        },
        {
          name: 'field3',
          value: 10
        }
      ]
    })

    expect(query.includes('SELECT field1,field2,field3 FROM mockTable')).toBe(true)
    expect(query.includes('WHERE')).toBe(true)
    expect(query.includes(`field1 = 'test' AND`)).toBe(true)
    expect(query.includes('field2 = true AND')).toBe(true)
    expect(query.includes('field3 = 10')).toBe(true)
    expect(query.substring(0,-3) !== 'AND').toBe(true)
  })

  it('create a select query with where equal', () => {
    const query = PostgresQueryAdapter.find({
      fields: [{
        name: 'field1'
      },
      {
        name: 'field2'
      },
      {
        name: 'field3'
      }],
      table: 'mockTable',
      where: [
        {
          name: 'field1',
          equal: false,
          value: "test"
        }
      ]
    })

    expect(query.includes('SELECT field1,field2,field3 FROM mockTable')).toBe(true)
    expect(query.includes('WHERE')).toBe(true)
    expect(query.includes(`field1 != 'test'`)).toBe(true)
    expect(query.substring(0,-3) !== 'AND').toBe(true)
  })


  it('create a select query with group by', () => {
    const query = PostgresQueryAdapter.find({
      fields: [{
        name: 'field1'
      }],
      table: 'mockTable',
      groupBy: [
        {
          name: 'field1'
        }
      ]
    })

    expect(query.includes('SELECT field1 FROM mockTable')).toBe(true)
    expect(query.includes('GROUP BY field1')).toBe(true)
    expect(query.includes(`WHERE`)).toBe(false)
    expect(query.includes(`ORDER BY`)).toBe(false)
  })

  it('should throw error when trying create a select query with group by with empty array', () => {
    const type = 'GROUP'
    const invokeFind = () => PostgresQueryAdapter.find({
      fields: [{
        name: 'field1'
      }],
      table: 'mockTable',
      groupBy: []
    })
  
    expect(invokeFind).toThrow(`${type} BY condition needs at least one field`)
  })

  it('create a select query with order by', () => {
    const query = PostgresQueryAdapter.find({
      fields: [{
        name: 'field1'
      }],
      table: 'mockTable',
      orderBy: [
        {
          name: 'field1'
        }
      ]
    })

    expect(query.includes('SELECT field1 FROM mockTable')).toBe(true)
    expect(query.includes('ORDER BY field1')).toBe(true)
    expect(query.includes(`WHERE`)).toBe(false)
    expect(query.includes(`GROUP BY`)).toBe(false)
  })

  it('should throw error when trying create a select query with order by with empty array', () => {
    const type = 'ORDER'
    const invokeFind = () => PostgresQueryAdapter.find({
      fields: [{
        name: 'field1'
      }],
      table: 'mockTable',
      orderBy: []
    })
  
    expect(invokeFind).toThrow(`${type} BY condition needs at least one field`)
  })

  it('create a select query with where, group by, order by', () => {
    const query = PostgresQueryAdapter.find({
      fields: [{
        name: 'id'
      }],
      table: 'public.people',
      orderBy: [
        {
          name: 'id'
        }
      ],
      groupBy: [
        {
          name: 'id'
        }
      ],
      where: [
        {
          name: 'id',
          value: 1
        }
      ]
    })

    expect(query.includes('SELECT id FROM public.people')).toBe(true)
    expect(query.includes('GROUP BY id')).toBe(true)
    expect(query.includes(`WHERE id = 1`)).toBe(true)
    expect(query.includes(`ORDER BY id`)).toBe(true)
  })

})