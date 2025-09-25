// atmf3NkoFhqdsBFN nikhilchawla9013_db_user
import "dotenv/config";
import express from "express";
import cors from "cors";
import connectDb from "./config/db";

const app = express();
const corsOptions = {
  origin: 'http://localhost:5173', // Replace with your frontend's URL
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], // Allowed HTTP methods
  credentials: true, // Allow credentials if needed
};
app.use(cors(corsOptions));
app.use(express.json());
// app.use(cookieParser());

app.get("/",(req,res)=>{
    console.log(req.cookies);
    res.send('Cookies parsed!');
});

connectDb().then((data)=>{
     console.log("Database connection established...");
    app.listen(process.env.PORT, () => {
      console.log("Server is successfully listening on port 7777...");
    });
}).catch((err)=>{
      console.error("Database cannot be connected!!", err.message );
})

// app.listen(3000, ()=>console.log("Server is running on 3000"));
