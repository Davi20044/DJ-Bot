const { EmbedBuilder } = require('discord.js');

module.exports = (queue, track) => {
    if (!client.config.app.ExtraMessages) return

    const audioTrackAdd = new EmbedBuilder()
    .setAuthor({name: `Musica **${track.title}** adicionada a fila ✅`, iconURL: track.thumbnail})
    .setColor('#2f3136')

queue.metadata.send({ embeds: [audioTrackAdd] })

}
