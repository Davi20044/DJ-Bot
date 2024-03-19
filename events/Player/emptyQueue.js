const { EmbedBuilder } = require('discord.js');
module.exports = (queue) => {
    const emptyQueue = new EmbedBuilder()
    .setAuthor({name: `Nenhuma musica na fila! ❌`})
    .setColor('#2f3136')

    queue.metadata.send({ embeds: [emptyQueue] })
}
