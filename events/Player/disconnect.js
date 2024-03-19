const { EmbedBuilder } = require('discord.js');

module.exports = (queue) => {

 const Disconnect = new EmbedBuilder()
    .setAuthor({name: `Disconectado do Canal de Voz, Limpando a Fila! ❌`})
    .setColor('#2f3136')

queue.metadata.send({ embeds: [Disconnect] })
}
