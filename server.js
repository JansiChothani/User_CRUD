import express from "express";
const app = express();
app.use(express.json());

let users = [
    {id : 1, name: "jansi", email: "jansichothani123@gmail.com"},
    {id : 2, name: "dipti", email: "jdipti123@gmail.com"},
    {id : 3, name: "neha", email: "neha123@gmail.com"},
]

app.post("/user" , (req,res) => {
    try{
        const {name, email} = req.body;
        if(! name || ! email){
            return res.send("Name or Email is missing..")
        }
        const newuser = {
            id : Date.now(),
            name,
            email,
        }
        users.push(newuser)
        return res.status(201).json({
            message : "User created...",
            data : newuser
        })
    }
    catch(error){
        res.send("Error in inserting data");
    }
})

app.get("/user", (req,res) => {
    try{
        res.send(users);
    }
    catch(error){
        console.log("Error " +error);
        res.send("Error in getting data");
    }
})

app.put("/user/:id" , (req,res)=>{
    try{
        const id = req.params.id;
        const {name, email} = req.body;
        if(! name || ! email){
            return res.send("name or email is missing...");
        }
        const user = users.find((user) => user.id == id);
        if(!user){
           return res.send("User not found...");
        }
        user.name = name;
        user.email = email;
        return res.status(201).json({
            message : "User updated...",
            data : user
        })
    }
    catch(error){
        console.log("Error " + error);
        res.send("Error in updating user");
    }
})

app.delete("/user/:id", (req,res) => {
    try {
        const id = req.params.id;
        const user = users.find((user) => user.id == id);
        if(!user){
           return res.send("User not found...");
        }
        users = users.filter((user) => user.id !== id);
        return res.status(200).json("User deleted..",)
    } catch (error) {
        console.log("error " + error);
        res.send("Error in deleting user...")
    }
})

app.listen(3000, () => {
    console.log("Server is running in port 3000");

})
