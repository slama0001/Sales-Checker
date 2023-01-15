const { EmbedBuilder, User } = require("discord.js");
const noblox = require('noblox.js')
const { RBLXCookie, GroupID } = require('../config.json')
const moment = require('moment')

module.exports = {
    name: "sales",
    description: "Check a users past sales",
    type: 1,
    options: [
        {
            name: "username",
            description: "the username to check",
            type: 3,
            required: true
        },
    ],
    permissions: {
        DEFAULT_MEMBER_PERMISSIONS: "SendMessages"
    },
    run: async (client, interaction) => {

        const currentUser = await noblox.setCookie(`${RBLXCookie}`)

        await interaction.deferReply()

        const Fetching = new EmbedBuilder()
            .setDescription(`Fetching sales data, this may take some time.`)
        const msg = await interaction.editReply({ embeds: [Fetching] })

        const Username = interaction.options.getString("username")
        const transactions = await noblox.getGroupTransactions(GroupID, "Sale", 100)
        const Data = transactions.find((x) => x.agent.name == Username)

        if (!Data) {
            const NoData = new EmbedBuilder()
                .setDescription(`No sales data. This means the user didn't buy or you have given an incorrect username.`)
                .setColor(`Red`)
            return msg.edit({ embeds: [NoData] })
        }

        const Price = Data.currency.amount / 0.7
        const Date = moment(Data.created).format("MMMM Do YYYY, h:mm:ss A")

        const SalesEmbed = new EmbedBuilder()
            .setDescription(
                `**Roblox Username:** \`${Data.agent.name} [${Data.agent.id}]\`\n
                **GamePass:** \`${Data.details.name}\`\n
                **Price:** \`${Price}\`\n
                **Date & Time of Purchase:** \`${Date}\`
                `)
        return msg.edit({ embeds: [SalesEmbed] })
    }
}