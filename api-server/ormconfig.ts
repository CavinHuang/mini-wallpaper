import { DataSource } from 'typeorm'

export default new DataSource({
  "type": "mysql",
  "host": "175.178.179.97",
  "port": 33068,
  "username": "mini-cms",
  "password": "SZCYaKRekDreKLDt",
  "database": "mini-cms",
  "entities": [
    "src/models/entitys/*.ts"
  ],
  "migrations": [
    "src/models/migration/*.ts"
  ],
  "subscribers": [
    "src/models/subscribers/*.ts"
  ],
  migrationsRun: true,
  "synchronize": false,
  "logging": true,
  migrationsTableName: 'history'
})
