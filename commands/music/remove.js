const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');
const { useMainPlayer, useQueue  } = require('discord-player');

module.exports = {
    name: 'remove',
    description: "Remove musicas da Fila",
    voiceChannel: true,
    options: [
        {
            name: 'song',
            description: 'O nome/url da musica que deseja remover da Fila',
            type: ApplicationCommandOptionType.String,
            required: false,
        },
        {
            name: 'number',
            description: 'O lugar da Fila em que a musica está',
            type: ApplicationCommandOptionType.Number,
            required: false,
        }
    ],

    async execute({ inter }) { 
        const player = useMainPlayer()

        const number =  inter.options.getNumber('number')
        const track = inter.options.getString('song');

const queue = useQueue(inter.guild);

        if (!queue || !queue.isPlaying()) return inter.editReply({ content: `Nenhuma musica tocando no momento ${inter.member}... Tente de novo ? ❌`, ephemeral: true });
        if (!track && !number) inter.editReply({ content: `Voce tem que usar uma das opções para remover a musica ${inter.member}... Tente de novo ? ❌`, ephemeral: true });

        const BaseEmbed = new EmbedBuilder()
        .setColor('#2f3136')


        if (track) {
            const track_to_remove = queue.tracks.toArray().find((t) => t.title === track || t.url === track);
            if (!track_to_remove) return inter.editReply({ content: `Não foi possivel encontar ${track} ${inter.member}... tente usando o url ou o nome completo da musica ? ❌`, ephemeral: true });
            queue.removeTrack(track_to_remove);
            BaseEmbed.setAuthor({name: `Removido **${track_to_remove.title}** da Fila ✅` })

            return inter.editReply({ embeds: [BaseEmbed] });
        }

        if (number) {

            const index = number - 1
            const trackname = queue.tracks.toArray()[index].title

            if (!trackname) return inter.editReply({ content: `Esta musica parece não existir ${inter.member}...  Tente de novo ?❌`, ephemeral: true });   

            queue.removeTrack(index);

            BaseEmbed.setAuthor({name: `Removido **${trackname}** da Fila ✅` })

            return inter.editReply({ embeds: [BaseEmbed] });
        }


         
    }
}
