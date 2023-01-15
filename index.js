// Basic Constants
const { token, RBLXCookie, GroupID } = require('./config.json')
const config = require('./config.json')
const { Client, IntentsBitField, Collection } = require('discord.js')
const noblox = require('noblox.js')

// Creating the client with valid intents
const client = new Client({
    intents: [
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildWebhooks,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.MessageContent
    ]
})

module.exports = client

// Creating Collections
client.slash_commands = new Collection();
client.events = new Collection();


// Initializing the Command & Event Handler
["slash_commands", "events"].forEach((file) => {
    require(`./handlers/${file}`)(client, config);
});


// Initializing the Roblox Login
const RBLXUser = noblox.setCookie(`${RBLXCookie}`)
console.log(`Successfully logged into Roblox.`)


// Initializing the Bot Login
client.login(token)
console.log(`[Sales Checker] is ready.`)