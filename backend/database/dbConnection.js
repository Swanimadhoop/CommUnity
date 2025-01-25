import mongoose from "mongoose";
console.log(process.env.MONGO_URI)
export const dbConnection = () => {
    mongoose
      .connect(process.env.MONGO_URI,{
        dbName:"commUnity",
      })
      .then(()=>{
        console.log("Connected to database!");
      })
      .catch((err)=>{
        console.log(`Some error occured while connecting to database: ${err}`);
      });
};