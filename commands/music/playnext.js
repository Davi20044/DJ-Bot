const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');
const { QueryType, useMainPlayer, useQueue   } = require('discord-player');

module.exports = {
    name: 'playnext',
    description: "Musica que voce deseja tocar a seguir",
    voiceChannel: true,
    options: [
        {
            name: 'song',
            description: 'Musica que voce deseja tocar a seguir',
            type: ApplicationCommandOptionType.String,
            required: true,
        }
    ],

    async execute({ inter }) {
        const player = useMainPlayer()

const queue = useQueue(inter.guild);

        if (!queue || !queue.isPlaying()) return inter.editReply({ content: `Nenhuma musica tocando no momento ${inter.member}... Tente de novo ? ❌`, ephemeral: true });

        const song = inter.options.getString('song');

        const res = await player.search(song, {
            requestedBy: inter.member,
            searchEngine: QueryType.AUTO
        });

        if (!res || !res.tracks.length) return inter.editReply({ content: `resultado não encontrado ${inter.member}... Tente de novo ? ❌`, ephemeral: true });

       if (res.playlist) return inter.editReply({ content: `Este comando não suporta Playlists ${inter.member}... Tente de novo ? ❌`, ephemeral: true });

        queue.insertTrack(res.tracks[0], 0)

        const PlayNextEmbed = new EmbedBuilder()
        .setAuthor({name: `A musica foi iserida na Fila... ela será reproduzida a seguir 🎧` })
        .setColor('#2f3136')
        
        await inter.editReply({ embeds: [PlayNextEmbed] });


    }
}
