const config = {
    user: 'admin',
    password: 'SuperPassword1!',
    server: 'green-lion-coffee.culwq5nruxbi.us-east-2.rds.amazonaws.com',
    database: 'Green-Lion-Coffee',
    options: {
        trustServerCertificate: true,
        
        enableArithAbort: true,
        instancename: 'SQLEXPRESS'
    },
    port: 1433
}
module.exports = config;