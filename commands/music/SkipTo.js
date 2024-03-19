const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');
const { useMainPlayer, useQueue  } = require('discord-player');

module.exports = {
    name: 'skipto',
    description: "Pula para uma musica especifica",
    voiceChannel: true,
    options: [
        {
            name: 'song',
            description: 'o nome/url da musica desejada',
            type: ApplicationCommandOptionType.String,
            required: false,
        },
        {
            name: 'number',
            description: 'A posição da musica na Fila',
            type: ApplicationCommandOptionType.Number,
            required: false,
        }
    ],

    async execute({ inter }) { 
        const player = useMainPlayer()

        const track = inter.options.getString('song');
        const number =  inter.options.getNumber('number')

const queue = useQueue(inter.guild);

        if (!queue || !queue.isPlaying()) return inter.editReply({ content: `Nenhuma musica tocando no momento ${inter.member}... Tente de novo ? ❌`, ephemeral: true });
        if (!track && !number) inter.editReply({ content: `Use uma das opções para pular a musica ${inter.member}... Tente de novo ? ❌`, ephemeral: true });

            if (track) {
                const track_skipto = queue.tracks.toArray().find((t) => t.title.toLowerCase() === track.toLowerCase() || t.url === track)
                if (!track_skipto) return inter.editReply({ content: `Musica não encontrada ${track} ${inter.member}... Tente usar o url ou o nome completo da musica ? ❌`, ephemeral: true });
                queue.node.skipTo(track_skipto);
                return inter.editReply({ content: `Jumped to ${track_skipto.title}  ✅` });
    }
    if (number) {
        const index = number - 1
        const trackname = queue.tracks.toArray()[index].title
        if (!trackname) return inter.editReply({ content: `Esta musica parece não existir ${inter.member}...  Tente de novo ?❌`, ephemeral: true });   
        queue.node.skipTo(index);

        const skipToEmbed = new EmbedBuilder()
        .setAuthor({name: `Pulado para **${trackname}** ✅`})
        .setColor('#2f3136')
        
        inter.editReply({ embeds: [skipToEmbed] });
    }
         
    }
}
