import './src/server/loadEnv'
import { typeOrmConfig } from '@/config';
import fs = require('fs');

// fs.writeFileSync('ormconfig.json', JSON.stringify(typeOrmConfig(), null, 2));
let content = `import { DataSource } from 'typeorm'

export const AppDataSource = new DataSource(${JSON.stringify(typeOrmConfig(), null, 2)})
`

fs.writeFileSync('ormconfig.ts', content)
