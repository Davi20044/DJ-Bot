const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'help',
    description: "Todos os comandos que o Bot tem !",
    showHelp: false,

    execute({ client, inter }) {
        const commands = client.commands.filter(x => x.showHelp !== false);

        const embed = new EmbedBuilder()
        .setColor('#ff0000')
        .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL({ size: 1024, dynamic: true }) })
        .setDescription('Comandos:')
        .addFields([ { name: `Disponiveis - ${commands.size}`, value: commands.map(x => `\`${x.name}\``).join(' | ') } ])
        .setTimestamp()
        .setFooter({ text: '️As musicas podem ser tocadas por Nome e link. \nCompativel com Youtube ou Spotify. \n \n❤️RPG BR❤️', iconURL: inter.member.avatarURL({ dynamic: true })});
		
        inter.editReply({ embeds: [embed] });
    },
};