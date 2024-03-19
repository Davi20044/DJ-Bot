const { EmbedBuilder } = require('discord.js');
const { useMainPlayer, useQueue  } = require('discord-player');

module.exports = {
    name: 'skip',
    description: 'Pula a Musica',
    voiceChannel: true,

    execute({ inter }) {
        const player = useMainPlayer()

const queue = useQueue(inter.guild);

         if (!queue || !queue.isPlaying()) return inter.editReply({ content:`Nenuma musica tocando no momento ${inter.member}... Tente de novo ? ❌`, ephemeral: true });

        const success = queue.node.skip();

        const SkipEmbed = new EmbedBuilder()
        .setColor('#2f3136')
        .setAuthor({name: success ? `Musica atual **${queue.currentTrack.title}** Pulada ✅` : `Alguma coisa deu errado ${inter.member}... Tente de novo ? ❌` })


       return inter.editReply({ embeds: [SkipEmbed] });

    },
};