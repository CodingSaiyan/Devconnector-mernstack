const mongoose = require("mongoose"),
      config = require("config"),
      db = config.get("mongoURI");

      const connectDB = async () => {
        try {
            await mongoose.connect(db, { 
                useNewUrlParser: true, 
                useCreateIndex: true,
                useFindAndModify: false });
            console.log("MongoDB Connected!!");
        } catch(err){
            console.err(err.message);

            //Exit process with failure
            process.exit(1);

        }
      }

      module.exports = connectDB;