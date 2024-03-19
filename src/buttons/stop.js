const { EmbedBuilder } = require('discord.js');
module.exports = async ({ client, inter, queue }) => { 
    if (!queue || !queue.isPlaying()) return inter.editReply({ content: `Nenhuma musica tocando no momento... Tente de novo ? ❌`, ephemeral: true });

    queue.delete();

        const StopEmbed = new EmbedBuilder()
        .setColor('#2f3136')
        .setAuthor({name: `Musica parada neste Server, nos vemos na proxima ✅` })


       return inter.editReply({ embeds: [StopEmbed], ephemeral: true });

}