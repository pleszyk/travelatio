import express from "express";
import cors from "cors";
import routes from "./routes/routes.js";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", routes);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let production = false;

if (production) {
  app.use(express.static(path.join(__dirname, "..", "client/dist")));

  // Send 'index.html' for all other routes
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "..", "client/dist", "index.html"));
  });
}

app.listen(3005, () => {
  console.log("Server is running on port 3005");
});
