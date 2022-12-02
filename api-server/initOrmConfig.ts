import './src/server/loadEnv'
import { typeOrmConfig } from '@/config';
import fs = require('fs');

fs.writeFileSync('ormconfig.json', JSON.stringify(typeOrmConfig(), null, 2));
