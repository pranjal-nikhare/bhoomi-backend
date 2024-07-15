import express from "express";
import cors from "cors";
import rootRouter from "./routes/routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", rootRouter);

// app.get("/", (req, res) => {
//   res.send("Working!");
// });

app.get("/", (req, res) => {
  const domainName = req.hostname; // Gets the domain name from the request
  const htmlContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Domain Name</title>
      </head>
      <body>
          <h1>Welcome to ${domainName}</h1>
      </body>
      </html>
  `;
  res.send(htmlContent);
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
