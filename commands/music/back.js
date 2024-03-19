const { EmbedBuilder } = require('discord.js');
const { useMainPlayer, useQueue  } = require('discord-player');
module.exports = {
    name: 'back',
    description: "Voltar para Musica Anterior",
    voiceChannel: true,

    async execute({ inter }) {
        const player = useMainPlayer()

const queue = useQueue(inter.guild);

        if (!queue || !queue.node.isPlaying()) return inter.editReply({ content: `Nenhuma musica tocando no momento ${inter.member}... Tente de novo ? ❌`, ephemeral: true });

        if (!queue.history.previousTrack) return inter.editReply({ content: `Não tem musica anterior ${inter.member}... Tente de novo ? ❌`, ephemeral: true });

        await queue.history.back();

        const BackEmbed = new EmbedBuilder()
        .setAuthor({name: `Tocando a Musica anterior ✅`})
        .setColor('#2f3136')

        inter.editReply({ embeds: [BackEmbed] });
    },
};