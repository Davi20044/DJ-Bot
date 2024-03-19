const { EmbedBuilder } = require('discord.js');
const { useMainPlayer, useQueue  } = require('discord-player');

module.exports = {
    name: 'shuffle',
    description: 'Embaralhe a Faixa',
    voiceChannel: true,

    async execute({ inter }) {
        const player = useMainPlayer()

const queue = useQueue(inter.guild);

        if (!queue || !queue.isPlaying()) return inter.editReply({ content: `Nenhuma musica tocando no momento ${inter.member}... Tente de novo ? ❌`, ephemeral: true });

        if (!queue.tracks.toArray()[0]) return inter.editReply({ content: `Nenhuma musica na Fila após essa ${inter.member}... Tente de novo ? ❌`, ephemeral: true });

        await queue.tracks.shuffle();

        const ShuffleEmbed = new EmbedBuilder()
        .setColor('#2f3136')
        .setAuthor({name: `Fila randomizada ${queue.tracks.size} Musicas ✅` })


       return inter.editReply({ embeds: [ShuffleEmbed] });
    },
};