const Mei = require("./structure/Mei");
require("dotenv").config();

const client = new Mei({
  intents: 65043,
  prefix: "m!",
  developers: ["1005290241743143043", "967486659560079420"],
  token: process.env.token,
});

const topgg = process.env.topgg
const { AutoPoster } = require('topgg-autoposter')
AutoPoster(topgg, client)

client.setup();
require("./mongoDB");