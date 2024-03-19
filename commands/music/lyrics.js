const { EmbedBuilder } = require('discord.js');
const { useMainPlayer, useQueue  } = require('discord-player');

module.exports = {
    name: 'lyrics',
    description: 'Obter a letra da faixa atual',
    voiceChannel: true,

    async execute({ inter }) {
        const player = useMainPlayer()

const queue = useQueue(inter.guild);

        if (!queue || !queue.isPlaying()) return inter.editReply({ content: `Nenhuma musica tocando no momento ${inter.member}... Tente de novo ? ❌`, ephemeral: true });
        
        try {
        
        const search = await genius.songs.search(queue.currentTrack.title); 

        const song = search.find(song => song.artist.name.toLowerCase() === queue.currentTrack.author.toLowerCase());
        if (!song) return inter.editReply({ content: `Nenhuma letra encontrada para ${queue.currentTrack.title}... Tente de novo ? ❌`, ephemeral: true });
        const lyrics = await song.lyrics();
        const embeds = [];
        for (let i = 0; i < lyrics.length; i += 4096) {
            const toSend = lyrics.substring(i, Math.min(lyrics.length, i + 4096));
            embeds.push(new EmbedBuilder()
                .setTitle(`Lyrics for ${queue.currentTrack.title}`)
                .setDescription(toSend)
                .setColor('#2f3136')
                .setTimestamp()
                .setFooter({ text: '❤️RPG BR❤️', iconURL: inter.member.avatarURL({ dynamic: true })})
                );
        }
        return inter.editReply({ embeds: embeds });

    } catch (error) {
            inter.editReply({ content: `Erro! Por favor contate o Desenvolvedor! | ❌`, ephemeral: true });
    } 
    },
};

