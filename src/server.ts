import "dotenv/config";
import app from "./app";

const port = process.env.APP_PORT || 2000;
app.listen(port, () => {
  console.log("App listen in port:", port);
});
