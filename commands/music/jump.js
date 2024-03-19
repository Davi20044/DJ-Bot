const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');
const { useMainPlayer, useQueue } = require('discord-player');

module.exports = {
    name: 'jump',
    description: "Pular uma Fila em particular",
    voiceChannel: true,
    options: [
        {
            name: 'song',
            description: 'O nome/url da Fila que voce deseja pular',
            type: ApplicationCommandOptionType.String,
            required: false,
        },
        {
            name: 'number',
            description: 'O lugar na fila em que a musica esta',
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
        if (!track && !number) inter.editReply({ content: `Voce tem que usar uma das opções para pular a musica ${inter.member}... Tente de novo ? ❌`, ephemeral: true });

            if (track) {
                const track_to_jump = queue.tracks.toArray().find((t) => t.title.toLowerCase() === track.toLowerCase() || t.url === track)
                if (!track_to_jump) return inter.editReply({ content: `Não foi possivel encontrar ${track} ${inter.member}... Tente usar o url ou o nome inteiro da musica ? ❌`, ephemeral: true });
                queue.node.jump(track_to_jump);
                return inter.editReply({ content: `Pulado para ${track_to_jump.title}  ✅` });
    }
    if (number) {
        const index = number - 1
        const trackname = queue.tracks.toArray()[index].title
        if (!trackname) return inter.editReply({ content: `Esta faixa não existe ${inter.member}...  Tente de novo ?❌`, ephemeral: true });   
        queue.node.jump(index);

        const JumpEmbed = new EmbedBuilder()
        .setAuthor({name: `Pulado para ${trackname} ✅`})
        .setColor('#2f3136')
        
        inter.editReply({ embeds: [JumpEmbed] });
    }
         
    }
}
