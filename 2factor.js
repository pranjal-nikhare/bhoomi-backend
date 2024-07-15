import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

function sendOTP(phoneNumber) {
  const API_KEY = process.env.API_KEY2factor;

  var config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `https://2factor.in/API/V1/${API_KEY}/SMS/+91${phoneNumber}/AUTOGEN2/BhoomiTemplete`,
    headers: {},
  };

  axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });
}

// Example usage
sendOTP("7709968385");

// Connect to MongoDB
// mongoose
//   .connect("mongodb+srv://admin:admin@users.1xk8ygk.mongodb.net/", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => {
//     console.log("Connected to MongoDB");
//   })
//   .catch((error) => {
//     console.error("Error connecting to MongoDB:", error);
//   });
