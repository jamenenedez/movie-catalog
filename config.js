module.exports = {
port: process.env.PORT || 3001,
db: process.env.MONGODB || 'mongodb://localhost:27001',
SECRET_TOKEN: 'topsecret'
}