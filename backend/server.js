const app = require('./app');
const connectDatabase = require('./config/database')

const dotenv = require('dotenv');

//setting up config file 
dotenv.config({ path: './backend/config/config.env'});

//connect to dbs
connectDatabase();


const server = app.listen(process.env.PORT, () =>{
    console.log(`Server started on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode.`)
})

//handle unhandled promise rejection and uncaught exceptions
process.on('uncaughtException', err => {
    console.log(`ERROR: ${err.stack}`);
    console.log(`Shutting down the server to solve ${err.message}`);
    server.close(() => {
        process.exit(1)
    })
})

