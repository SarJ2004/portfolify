import { spawn } from "child_process";
import dotenv from "dotenv";

dotenv.config();

const mongoshProcess = spawn(
  "mongosh",
  [
    process.env.MONGOSH_URI,
    "--apiVersion",
    "1",
    "--username",
    process.env.MONGOSH_USERNAME,
  ],
  { stdio: "inherit" }
);

mongoshProcess.on("close", (code) => {
  console.log(`Mongosh process exited with code ${code}`);
});
