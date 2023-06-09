const express = require("express");
const mysql = require("mysql2");
const multer = require('multer');

const app = express();
const upload = multer({ dest: 'uploads/' });
const PORT = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

try {
  const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "mstart",
  });

  
  //Route to add a new user

  app.post("/add_users", (req, res) => {
    const data = req.body;
    console.log("body data are : ", data);
    connection.query("USE mstart");
    connection.query(
      `INSERT INTO users (Server_DateTime , DateTime_UTC , Update_DateTime_UTC ,Last_Login_DateTime_UTC ,Name , Email , Phone , Status , Gender , Date_Of_Birth)
       VALUES (CURRENT_TIMESTAMP , CURRENT_TIMESTAMP , null , null , '${data.name}' , '${data.email}' , '${data.phone}' , '${data.status}' , '${data.gender}' , '${data.date_of_birth}')`,
      function (err, results, fields) {
        console.log(err);
        console.log(results); // results contains rows returned by server
        console.log(fields); // fields contains extra meta data about results, if available
      }
    );

    res.status(200).json(data);
  });


    //Route to add a new deals

    app.post("/add_deals", (req, res) => {
      const dealsData = req.body;
      console.log("body data are : ", dealsData);
      connection.query("USE mstart");
      connection.query(
        `INSERT INTO deals (Server_DateTime , DateTime_UTC , Update_DateTime_UTC ,Name , Description , Status , Amount , Currency) 
         VALUES (CURRENT_TIMESTAMP , CURRENT_TIMESTAMP , null , '${dealsData.name}' , '${dealsData.description}' , '${dealsData.status}' , '${dealsData.amount}' , '${dealsData.currency}')`,
        function (err, results, fields) {
          console.log(err);
          console.log(results); // results contains rows returned by server
          console.log(fields); // fields contains extra meta data about results, if available
        }
      );
  
      res.status(200).json(dealsData);
    });

    // Route update the status for users

    app.put("/user-update-status/:id", (req, res) => {
      const id = req.params.id;
      const newStatus = req.body.status;
      connection.query("USE mstart");
      connection.query(
        `UPDATE users SET Status = '${newStatus}' WHERE ID = '${id}'`,
        function (err, results, fields) {
          console.log(err);
          console.log(results); // results contains rows returned by server
          console.log(fields); // fields contains extra meta data about results, if available
        }
      );
      res.status(200).json(newStatus);
    });

    // Route update the status for deals

    app.put("/deals-update-status/:id", (req, res) => {
      const dealsId = req.params.id;
      const dealsNewStatus = req.body.status;
      connection.query("USE mstart");
      connection.query(
        `UPDATE deals SET Status = '${dealsNewStatus}' WHERE ID = '${dealsId}'`,
        function (err, results, fields) {
          console.log(err);
          console.log(results); // results contains rows returned by server
          console.log(fields); // fields contains extra meta data about results, if available
        }
      );
      res.status(200).json(dealsNewStatus);
    });

    // Route for signup

    app.post("/signup", (req, res) => {
      const signupData = req.body;
      console.log("body data are : ", signupData);
      connection.query("USE mstart");
      connection.query(
        `INSERT INTO users (Server_DateTime , DateTime_UTC , Update_DateTime_UTC ,Last_Login_DateTime_UTC ,Name , Email , Phone , Status , Gender , Date_Of_Birth)
         VALUES (CURRENT_TIMESTAMP , CURRENT_TIMESTAMP , null , null , '${signupData.name}' , '${signupData.email}' , '${signupData.phone}' , '${signupData.status}' , '${signupData.gender}' , '${signupData.date_of_birth}')`,
        function (err, results, fields) {
          console.log(err);
          console.log(results); // results contains rows returned by server
          console.log(fields); // fields contains extra meta data about results, if available
        }
      );
  
      res.status(200).json(signupData);
    });

    // Route for Login

app.post('/login', (req, res) => {

  const  email = req.body.email;
  const  password = req.body.password;
  
  const query = `SELECT * FROM Users WHERE Email = '${email}' AND Password = '${password}'`;
  

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error executing MySQL query:', err);
      res.sendStatus(500);
    } else {
      if (results.length > 0) {
        res.json({ registered: true });
      } else {
        res.json({ registered: false });
      }
    }
  });
});

    
    // Route to get all deals

    app.get("/deals", (req, res) => {
  
      connection.query("USE mstart");
      connection.query(`SELECT * FROM deals`, function (err, results, fields) {
        console.log(err);
        console.log(results); // results contains rows returned by server
        console.log(fields); // fields contains extra meta data about results, if available
        res.status(200).json(results);
      });
      
    });
    // Route to get all users


app.get("/users", (req, res) => {
  
  connection.query("USE mstart");
  connection.query(`SELECT * FROM users`, function (err, results, fields) {
    console.log(err);
    console.log(results); // results contains rows returned by server
    console.log(fields); // fields contains extra meta data about results, if available
    res.status(200).json(results);
  });

 
  
});

  // Route to delete users 
  app.post("/delete-users", (req, res) => {
    const userDeleteId = JSON.parse(req.body.ids);
    connection.query("USE mstart");
    connection.query(`DELETE FROM users WHERE ID in (${userDeleteId.join(',')}) `, function (err, results, fields) {
      if (err) {
        console.log(err);
        res.status(500).json({ error: 'Failed to delete user.' });
      } else {
        console.log(results);
        res.status(200).json({ message: 'User deleted successfully.' });
      }
    });
  });

// Route to count climed deals 
  app.get("/claimed-deals/count", (req, res) => {
    const query = "SELECT COUNT(ID) AS total FROM claimeddeals";
  
    connection.query(query, (err, results) => {
      if (err) {
        console.error("Error executing the query: ", err);
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }
  
      const totalClaimedDeals = results[0].total;
      res.json({ totalClaimedDeals });
    });
  });

  // Route to view of all claimed deals
  app.get("/claimed-deals", (req, res) => {
    const { userId } = req.query;
    
    let query = "SELECT * FROM claimeddeals";
    let params = [];
  
    if (userId) {
      query += " WHERE User_ID = ?";
      params.push(userId);
    }
  
    connection.query(query, params, (err, results) => {
      if (err) {
        console.error("Error executing the query: ", err);
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }
  
      res.json(results);
    });
  });
  
  // route to upload file 

  app.post('/upload', upload.single('photo'), (req, res) => {
    // Get the uploaded file details
    const file = req.file;
    
    if (!file) {
      res.status(400).send('No file uploaded');
    } else {
      // Save the file details to the database
      const query = 'UPDATE users SET Profile_photo = ? WHERE ID = ?';
      connection.query(query, [file.filename, req.body.userId], (error, results) => {
        if (error) {
          console.error('Error saving file to the database:', error);
          res.status(500).send('Error saving file');
        } else {
          res.status(200).send('File uploaded and saved to the database');
        }
      });
    }
  });
  
  // route to show count and total amounts of climeds deals 

  app.get('/show-count/:id',(req,res)=>{
    const userId = req.params.id
    connection.query(`SELECT count(1) as Count , IFNULL(sum(Amount) , 0) as Amount from claimeddeals where User_ID = ${userId}`, function (err, results, fields) {
      console.log(err);
      console.log(results); // results contains rows returned by server
      console.log(fields); // fields contains extra meta data about results, if available
      res.status(200).json(results);
    })
  })

  console.log("database connected successfully! ");
} catch (error) {
  console.log(" error : ", error);
  return;
}




//select from third table where user_id = data.user_id

//delete one or more :
// api delete  ==> where user id #in ()
// delete from users where id in (1);

// fs package or multer to handle files

// app.get('/test' , (req,res)=>{
//     res.send("test first api")
// })

// app.get('/test/:id' , (req,res)=>{
//     const id = req.params.id;
//     console.log("this is id : "+ id);
//     res.send("return log id done ")
// })

app.listen(PORT, (error) => {
  if (!error)
    console.log(
      "Server is Successfully Running,and App is listening on port " + PORT
    );
  else console.log("Error occurred, server can't start", error);
});
