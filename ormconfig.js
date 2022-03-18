module.exports = {
    type: "postgres",
    host: process.env.RDS_SBUFPE_SERVER_HOST,
    port: process.env.RDS_SBUFPE_SERVER_DB_PORT,
    username: process.env.RDS_SBUFPE_SERVER_USER,
    password: process.env.RDS_SBUFPE_SERVER_PWD,
    database: process.env.RDS_SBUFPE_SERVER_DB
 }