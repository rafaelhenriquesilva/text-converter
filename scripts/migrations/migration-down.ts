import { Migrations } from "../../src/infra/database/pg-promise/migrations"

const migrations = new Migrations()
migrations.reset()