const { EmbedBuilder } = require('discord.js');
const { useMainPlayer, useQueue  } = require('discord-player');

module.exports = {
    name: 'stop',
    description: 'Para a musica',
    voiceChannel: true,

    execute({ inter }) {
        const player = useMainPlayer()

const queue = useQueue(inter.guild);

        if (!queue || !queue.isPlaying()) return inter.editReply({ content:`Nenhuma musica tocando no momento ${inter.member}... Tente de novo ? ❌`, ephemeral: true });

        queue.delete();

        const StopEmbed = new EmbedBuilder()
        .setColor('#2f3136')
        .setAuthor({name: `Musica parada no Server, Nos vemos na proxima ✅` })


       return inter.editReply({ embeds: [StopEmbed] });

    },
};