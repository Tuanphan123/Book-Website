const mongoose = require('mongoose');

const connectDatabase = async()=>{
    try{
        const  conn = await mongoose.connect(process.env.DB_LOCAL_URI);
        console.log(`DBconnection successfull with host: ${conn.connection.host}`)
    }catch (error){
        console.log(`Loi ket noi`)
    }
}

module.exports = connectDatabase