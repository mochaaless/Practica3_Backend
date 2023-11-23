import express from "npm:express@4.18.2";
import mongoose from "npm:mongoose@7.6.3";

import addGestor from "./resolvers/postGestor.ts";
import addClient from "./resolvers/postClients.ts";
import deleteClientsbyDNI from "./resolvers/deleteClientsbyDNI.ts";
import sendMoney from "./resolvers/sendMoney.ts";
import topupClient from "./resolvers/topupClient.ts";
import getClientsbyDNI from "./resolvers/getClient.ts";
import addHipoteca from "./resolvers/postHipoteca.ts";

import {load} from "https://deno.land/std@0.204.0/dotenv/mod.ts"
const env = await load();

const MONGO_URL = env.MONGO_URL || Deno.env.get("MONGO_URL");

if (!MONGO_URL) {
  console.log("No mongo URL found");
  Deno.exit(1);
}

await mongoose.connect(MONGO_URL);
const app = express();
app.use(express.json());
app
.post("/gestor", addGestor)
.post("/client", addClient)
.delete("/client/:dni", deleteClientsbyDNI)
.put("/send", sendMoney)
.put("/topup", topupClient)
.get("/client/:dni", getClientsbyDNI)
.post("/hipoteca", addHipoteca)

app.listen(3000, () => {
    console.log("Server listening on port 3000");
  });