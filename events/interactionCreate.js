const client = require("../index.js");
const config = require("../config.json");

module.exports = {
  name: "interactionCreate"
};

client.on('interactionCreate', async (interaction) => {
  if (interaction.isChatInputCommand()) {
    const command = client.slash_commands.get(interaction.commandName);

    if (!command) return;

    try {
      command.run(client, interaction);
    } catch (e) {
      console.error(e)
    };
  };
});

