import appInit from "./server";
const port = process.env.PORT;

const buildApp = async () => {
  const app = await appInit();
  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });
};

buildApp();

