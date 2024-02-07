const Meimi = require("./structures/Meimi");
require("dotenv").config();

const client = new Meimi({
  intents: 65043,
  prefix: "m!",
  divos: ["1005290241743143043", "967486659560079420"],
  token: process.env.token,
});

client.setup();
require("./mongoDB");