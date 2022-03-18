module.exports = {
    type: "postgres",
    host: process.env.RDS_WAY_SERVER,
    port: 5432,
    username: "rds-server-dev",
    password: process.env.RDS_WAY_SERVER_PWD,
    database: process.env.RDS_WAY_SERVER_DB
 }