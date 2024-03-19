const { EmbedBuilder } = require('discord.js');

module.exports = (queue) => {
    if (!client.config.app.ExtraMessages) return

    const audioTracksAdd = new EmbedBuilder()
    .setAuthor({name: `Todas as musicas da Playlist foram adicionadas a Fila ✅`})
    .setColor('#2f3136')

queue.metadata.send({ embeds: [audioTracksAdd] })

}
