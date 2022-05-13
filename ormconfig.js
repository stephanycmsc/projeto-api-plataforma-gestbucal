module.exports = {
    type: "postgres",
    host: process.env.RDS_SBUFPE_SERVER_HOST,
    port: process.env.RDS_SBUFPE_SERVER_DB_PORT,
    username: process.env.RDS_SBUFPE_SERVER_USER,
    password: process.env.RDS_SBUFPE_SERVER_PWD,
    database: process.env.RDS_SBUFPE_SERVER_DB,
    entities: ['src/database/entities/**/*.ts'],
    subscribers: ['src/database/subscribers/**/*.ts'],
    migrations: ['src/database/migrations/**/*.ts'],
    logging: true,
    dropSchema: false, //Don't use this in production or can lose all our data.
    synchronize: false, //Don't use this in production or can lose all our data.
    cli: {
        entitiesDir: 'src/database/entities',
        migrationsDir: 'src/database/migrations',
        subscribersDir: 'src/database/subscribers'
    }
 }