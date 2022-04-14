module.exports = {
    type: "postgres",
    host: process.env.RDS_SBUFPE_SERVER_HOST,
    port: process.env.RDS_SBUFPE_SERVER_DB_PORT,
    username: process.env.RDS_SBUFPE_SERVER_USER,
    password: process.env.RDS_SBUFPE_SERVER_PWD,
    database: process.env.RDS_SBUFPE_SERVER_DB,
    entities: ['src/entity/**/*.ts'],
    subscribers: ['src/subscriber/**/*.ts'],
    migrations: ['src/migration/**/*.ts'],
    logging: true,
    dropSchema: false, //Don't use this in production or can lose all our data.
    synchronize: false, //Don't use this in production or can lose all our data.
    cli: {
        entitiesDir: 'src/entity',
        migrationsDir: 'src/migration',
        subscribersDir: 'src/subscriber'
    }
 }