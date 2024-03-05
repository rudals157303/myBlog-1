import { MongoClient } from "mongodb";

// const url =
//   "mongodb+srv://rudals782:qwer1234@cluster0.tcxk5pu.mongodb.net/?retryWrites=true&w=majority";
// "mongodb+srv://admin:qwer1234@cluster0.molkauq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const url =
  "mongodb+srv://rudals782:qwer1234@cluster0.tcxk5pu.mongodb.net/?retryWrites=true&w=majority";
// const options = { useNewUrlParser: true };
if (!url) {
  throw new Error("The MONGODB_URL environment variable is not defined");
}
let connectDB: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
  if (!global._mongo) {
    global._mongo = new MongoClient(url).connect();
  }
  connectDB = global._mongo;
} else {
  connectDB = new MongoClient(url).connect();
}
export { connectDB };
