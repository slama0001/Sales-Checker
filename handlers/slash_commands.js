const client = require("../index");
const { PermissionsBitField, Routes, REST, User } = require('discord.js');
const fs = require("fs");
const { BotID } = require('../config.json')

module.exports = (client, config) => {
    let commands = [];
    fs.readdirSync('./commands/').forEach((dir) => {
        const SlashCommands = fs.readdirSync(`./commands/`).filter((file) => file.endsWith('.js'));

        for (let file of SlashCommands) {
            let pull = require(`../commands/${file}`);

            if (pull.name, pull.description, pull.type == 1) {
                client.slash_commands.set(pull.name, pull);

                commands.push({
                    name: pull.name,
                    description: pull.description,
                    type: pull.type || 1,
                    options: pull.options ? pull.options : null,
                    default_permission: pull.permissions.DEFAULT_PERMISSIONS ? pull.permissions.DEFAULT_PERMISSIONS : null,
                    default_member_permissions: pull.permissions.DEFAULT_MEMBER_PERMISSIONS ? PermissionsBitField.resolve(pull.permissions.DEFAULT_MEMBER_PERMISSIONS).toString() : null
                });
            };
        };
    });

    if (!BotID) {
        console.log("[Invalid Client ID] Set one up in 'config.json'" + "\n");
        return process.exit();
    };

    const rest = new REST({ version: '10' }).setToken(config.token);

    (async () => {

        try {
            await rest.put(
                Routes.applicationCommands(BotID),
                { body: commands }
            );
        } catch (err) {
            console.log(err);
        }
    })();
};
