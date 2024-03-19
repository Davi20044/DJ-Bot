const { EmbedBuilder } = require('discord.js');
const { useMainPlayer, useQueue  } = require('discord-player');

module.exports = {
    name: 'resume',
    description: 'Volta a tocar a musica',
    voiceChannel: true,

    execute({ inter }) {
        const player = useMainPlayer()

const queue = useQueue(inter.guild);

        if (!queue) return inter.editReply({ content: `Nenhuma musica esta tocando no momento ${inter.member}... Tente de novo ? ❌`, ephemeral: true });
        

        if(queue.node.isPlaying()) return inter.editReply({content: `Esta musica já esta tocando, ${inter.member}... Tente de Novo ? ❌`, ephemeral: true})

        const success = queue.node.resume();
        
        const ResumeEmbed = new EmbedBuilder()
        .setAuthor({name: success ? `Musica atual **${queue.currentTrack.title}** Tocando ✅` : `Alguma coisa deu errado ${inter.member}... Tente de novo ? ❌` })
        .setColor('#2f3136')
        
        return inter.editReply({ embeds: [ResumeEmbed] });

    },
};
