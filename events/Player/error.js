const { EmbedBuilder } = require('discord.js');

module.exports = (queue, error) => {
    
    const ErrorEmbed = new EmbedBuilder()
    .setAuthor({name: `Bot teve um erro inesperado, Por favor verifique o console imediatamente!`})
    .setColor('#EE4B2B')
    
queue.metadata.send({ embeds: [ErrorEmbed] })

console.log(`Erro emitido pelo Bot ${error.message}`);
}
