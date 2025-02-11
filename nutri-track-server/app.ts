import appInit from "./server";
import http from "http";
import https from "https";
import fs from "fs";


const port = process.env.PORT;

const buildApp = async () => {
  const app = await appInit();
  console.log("process.env.NODE_ENV", process.env.NODE_ENV);

  if (process.env.NODE_ENV != "production") {
  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });
} else {
  const prop = {
    key: fs.readFileSync("../client-key.pem"),
    cert: fs.readFileSync("../client-cert.pem"),
  }

  https.createServer(prop, app).listen(port, () => {
    console.log(`Example app listening at https://localhost:${port} --- production`);
  });
}

};

buildApp();

