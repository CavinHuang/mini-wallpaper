import dotEnv from 'dotenv'
import fs from 'fs'
import path from 'path'

export function loadEnv() {
  const envPath = path.resolve(process.cwd(), '.env')
  if (fs.existsSync(envPath)) {
    const envConfig = dotEnv.parse(fs.readFileSync(envPath))
    console.log(envConfig)
    for (const k in envConfig) {
      process.env[k] = envConfig[k]
    }
  }
}

loadEnv()