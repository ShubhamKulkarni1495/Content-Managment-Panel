const mongoose = require('mongoose');
const db = "mongodb+srv://shubhamkulkarni:shubham14@contentmanagementpanel.f9rag.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

// mongoose.connect(db)
const connection = async () => {
    try {
        await mongoose.connect(db,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('MongoDB connected..')
    } catch(err){
        console.error(err.message);
        // Exit process with failure
        process.exit(1);
    }
}
module.exports=connection;