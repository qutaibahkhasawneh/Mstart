const mysql = require("mysql2");
function database() {
  try {
    const connection = mysql.createConnection({
      host: "localhost",
      user: "root",
      database: "mstart",
    });

    console.log("database connected successfully! ");

    return connection;
  } catch (error) {
    console.log("database connection error : ", error);
    return error;
  }
}

export default database;
