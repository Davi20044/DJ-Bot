const { EmbedBuilder } = require("discord.js");
const { useMainPlayer, useQueue  } = require('discord-player');

module.exports = {
    name: 'save',
    description: 'Salva a musica atual!',
    voiceChannel: true,

    async execute({ inter }) {
        const player = useMainPlayer()

const queue = useQueue(inter.guild);

        if (!queue) return inter.editReply({ content: `Nenhuma musica esta tocando no momento ${inter.member}... Tente de novo ? ❌`, ephemeral: true });

        inter.member.send({
            embeds: [
                new EmbedBuilder()
                    .setColor('#2f3136')
                    .setTitle(`:arrow_forward: ${queue.currentTrack.title}`)
                    .setURL(queue.currentTrack.url)
                    .addFields(
                        { name: ':hourglass: Duration:', value: `\`${queue.currentTrack.duration}\``, inline: true },
                        { name: 'Song by:', value: `\`${queue.currentTrack.author}\``, inline: true },
                        { name: 'Views :eyes:', value: `\`${Number(queue.currentTrack.views).toLocaleString()}\``, inline: true },
                        { name: 'Song URL:', value: `\`${queue.currentTrack.url}\`` }
                    )
                    .setThumbnail(queue.currentTrack.thumbnail)
                    .setFooter({text:`from the server ${inter.member.guild.name}`, iconURL: inter.member.guild.iconURL({ dynamic: false })})
            ]
        }).then(() => {
            return inter.editReply({ content: `Enviei-lhe o titulo da musica por mensagens privadas ✅`, ephemeral: true });
        }).catch(error => {
            return inter.editReply({ content: `Não foi possivel lhe emviar uma mensagem privada... Tente de novo ? ❌`, ephemeral: true });
        });
    },
};