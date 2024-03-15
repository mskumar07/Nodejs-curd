const express = require("express");
const app = express();
const conn = require("./model"); // Assuming "./model" exports your MySQL connection

app.use(express.json()); // Use JSON middleware to parse request bodies


//Post
app.post("/post", async (req, res) => {
  try {
    const { name, age, email } = req.body;
    const insertQuery =
      "INSERT INTO sample (name, age, email) VALUES(?,?,?)";
    const values = [name, age, email];

    const insert_Data = conn.query(insertQuery, values, (err, result) => {
      if (err) {
        res.status(500).json({ message: "Error inserting data" });
        return;
      }
      res.json({ message: "Data inserted successfully" });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

//get
app.get("/get",(res,req)=>{
    try{
        const select = "select * from sample"

        conn.query(select,(err,result)=>{
            if(err){
                console.log(err.message)
            }else{
                req.send(result);  
            }
    })
}catch(err){
        // res.status(500).json({message:err.message})
        console.log(err);
    }
})


app.put("/update", async (req, res) => {
  try {
    const { conditionField, conditionValue, updatedField, updatedValue } = req.body;

    // const checkQuery = "SELECT email FROM sample WHERE email = ?";
    const updateQuery = "UPDATE sample SET ?? = ? WHERE ?? = ?";
    const updatedValues = [
      updatedField,
      updatedValue,
      conditionField,
      conditionValue,
    ];
    // console.log(conditionField, conditionValue, updatedField, updatedValue);
    const data = conn.query(updateQuery, updatedValues, (err, result) => {
          if (err) {
            console.error(err);
            return res.status(500).json({ message: "Error updating data" });
          } 
          res.status(200).json({ message: data });
    });
  } catch (err) {
    res.status(500).json({message:err.message})
    }
});

//delete

app.delete("/delete",async (req,res)=>{
  try{
    const { email }=req.body;
    const deleteData = "delete from sample where email  = ? "

    console.log(email)
    
    conn.query(deleteData, email,(err,request)=>{
      if (err){
        console.log(err);
        res.status(500).json({ message: err.message});
      }
      res.status(200).json({message:"data deleted.."})
    })
  }catch(error){
    res.status(500).json({message:err.message})
  }
  


})



app.listen(2000, () => console.log("Server is running on port 2000"));
