const { EmbedBuilder } = require('discord.js');
module.exports = async ({ client, inter, queue }) => { 
    if (!queue || !queue.isPlaying()) return inter.editReply({ content: `Nenhuma musica tocando no momento... Tente de novo ? ❌`, ephemeral: true });

    if (!queue.tracks.toArray()[0]) return inter.editReply({ content: `Nenhuma musica na Fila após a atual ${inter.member}... Tente de novo ? ❌`, ephemeral: true });

        await queue.tracks.shuffle();

        const ShuffleEmbed = new EmbedBuilder()
        .setColor('#2f3136')
        .setAuthor({name: `Fila randomizada **${queue.tracks.size}** Musicas! ✅` })


       return inter.editReply({ embeds: [ShuffleEmbed], ephemeral: true});
}