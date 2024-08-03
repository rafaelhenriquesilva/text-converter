import { Migrations } from "../../../migrations"

describe('Migrations', () => {
  let migrations: Migrations
  beforeAll(() => {
    migrations= new Migrations()
  })
  it('Migrations reset method', async() => {
    await migrations.reset()
  })
  it('Migrations execute method', async() => {
    await migrations.execute()
  })
})