const {Client} = require('discord.js-v11-stable');
const {token, server, from, targets} = require('./config.json');
const client = new Client();

client.once('ready', () => {
    console.log(`Connecté en tant que ${client.user.tag} (${client.user.id})`);
});

client.on('message', message => {
    if (message.author.id !== client.user.id) return;
    if (message.guild.id !== server) return;
    if (from[message.channel.id]) {
        const servers = targets[from[message.channel.id]];
        for (const [serverId, channelId] of Object.entries(servers)) {
            const guild = client.guilds.get(serverId);
            if (!guild) continue;
            const channel = guild.channels.get(channelId);
            if (!channel) continue;
            channel.send(message.content).catch(() => true);
        }
    }
});

client.login(token);
