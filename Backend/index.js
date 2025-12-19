
import mongoose from "mongoose";
import express from "express";
import session from "express-session";
import { checkSchema, validationResult, matchedData } from "express-validator";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import { createUserValidationSchema } from "./utils/validationSchemas.js";
import { User } from "./mongoose/schema/UserSchema.js";
import MainRouter from "./routes/MainRouter.js";

mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("Database connected successfully"))
    .catch((error) => console.log(error));

const app = express();

app.use(cors({
    origin : "http://13.53.127.30:3000",
    credentials : true
}));
app.use(express.json());

app.use(session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: 60000 * 60,
        httpOnly : true,
        sameSite : "lax",
        secure : false  
    }
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(
    { usernameField: "email", passwordField: "password" },
    async (email, password, done) => {

        try {
            const user = await User.findOne({ email: email });

            if (!user) {
                return done(null, false, { message: "No user found" });
            }

            if (user.password !== password) {
                return done(null, false, { message: "Incorrect password" });
            }

            return done(null, user);
        }
        catch(error){
            return done(error);
        }
        
    }
));
passport.serializeUser((user,done) => {
    return done(null , user._id);
});

passport.deserializeUser( async (id , done) => {
    try{
        const user = await User.findById(id).select("-password");
        done(null , user);
    }
    catch(error) {
        done(error);
    }
});
app.use(MainRouter);

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`);
})

app.get("/", (request, response) => {
    response.status(200).send({ message: "This is the home page" });
});


app.post("/api/login" , (request,response , next) => {
    passport.authenticate("local" , (error , user , info) => {
        if(error){
            next(error);
        }
        if(!user){
            return response.status(400).send({message : "Login failed" , info});
        }

        request.logIn(user, (error) => {
            if(error) {
                return next(error);
            }
            console.log(user);
            return response.json({message : "Login Successfull", user});
        });
    })(request,response,next);
});

app.post("/api/logout" , (request,response) => {
    request.logOut(() => {
        response.json({message : "Logged Out Successfully."});
    });
}); 


app.post("/api/register", checkSchema(createUserValidationSchema), async (request, response) => {

    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return response.status(400).send({ error: errors.array() });
    }

    const data = matchedData(request);

    const newUser = new User(data);

    try {
        const savedUser = await newUser.save();
        return response.status(201).send(savedUser);
    }
    catch (error) {
        return response.status(400).send({ error: error });
    }

});

app.post("/api/me" , (request,response) => {
    if(!request.isAuthenticated()){
        return response.status(401).send({message : "User not authenticated"});
    }
    return response.json(request.user);
});