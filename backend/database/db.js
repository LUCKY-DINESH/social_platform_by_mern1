import mongoose from "mongoose";
export const connectDb=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL,{
        dbName:"YOUTUBEMERNSOCIAL",
    });
    console.log("connect to mongodb")
}catch(error){
        console.log(error);
    }
};