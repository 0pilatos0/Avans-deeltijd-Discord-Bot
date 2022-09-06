require("dotenv").config();

const config = require("./config.json");
const { Client, GatewayIntentBits } = require("discord.js");
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
  setPresence();
  setInterval(() => {
    setPresence();
  }, 300);
});

client.on("messageCreate", async (message) => {
  console.log(message.content);
});

client.on("MessageCreate", (message) => {
  console.log(message);
});

function setPresence() {
  client.user.setPresence({
    activities: [{ name: randomStatus() }],
    status: "active",
  });
}

function randomStatus() {
  return config.status[Math.floor(Math.random() * config.status.length)];
}

client.login(process.env.TOKEN);
