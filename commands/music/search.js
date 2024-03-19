const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');
const { QueryType, useMainPlayer, useQueue } = require('discord-player');

module.exports = {
    name: 'search',
    description: 'Busque uma musica',
    voiceChannel: true,
    options: [
        {
            name: 'song',
            description: 'A musica que voce busca',
            type: ApplicationCommandOptionType.String,
            required: true,
        }
    ],

    async execute({ client, inter }) {
        const player = useMainPlayer()

        const song = inter.options.getString('song');

        const res = await player.search(song, {
            requestedBy: inter.member,
            searchEngine: QueryType.AUTO
        });

        if (!res || !res.tracks.length) return inter.editReply({ content: `Resultado não encontrado ${inter.member}... Tente de novo ? ❌`, ephemeral: true });

        const queue = await player.nodes.create(inter.guild, {
            metadata: inter.channel,
            spotifyBridge: client.config.opt.spotifyBridge,
            volume: client.config.opt.defaultvolume,
            leaveOnEnd: client.config.opt.leaveOnEnd,
            leaveOnEmpty: client.config.opt.leaveOnEmpty
        });
        const maxTracks = res.tracks.slice(0, 10);

        const embed = new EmbedBuilder()
        .setColor('#2f3136')
        .setAuthor({ name: `Resultados para ${song}`, iconURL: client.user.displayAvatarURL({ size: 1024, dynamic: true })})
        .setDescription(`${maxTracks.map((track, i) => `**${i + 1}**. ${track.title} | ${track.author}`).join('\n')}\n\nSelecione entre **1** e **${maxTracks.length}** ou **Cancele** ⬇️`)
        .setTimestamp()
        .setFooter({ text: '❤️RPG BR❤️', iconURL: inter.member.avatarURL({ dynamic: true })})

        inter.editReply({ embeds: [embed] });

        const collector = inter.channel.createMessageCollector({
            time: 15000,
            max: 1,
            errors: ['time'],
            filter: m => m.author.id === inter.member.id
        });

        collector.on('collect', async (query) => {
            if (query.content.toLowerCase() === 'cancel') return inter.followUp({ content: `Busca cancelada ✅`, ephemeral: true }), collector.stop();

            const value = parseInt(query);
            if (!value || value <= 0 || value > maxTracks.length) return inter.followUp({ content: `Resposta invalida, tente um valor entre **1** e **${maxTracks.length}** ou **Cancele**... Tente de novo ? ❌`, ephemeral: true });

            collector.stop();

            try {
                if (!queue.connection) await queue.connect(inter.member.voice.channel);
            } catch {
                await player.deleteQueue(inter.guildId);
                return inter.followUp({ content: `Imposibilitado de entrar no canal de voz ${inter.member}... Tente de novo ? ❌`, ephemeral: true });
            }

            await inter.followUp(`Loading your search... 🎧`);

            queue.addTrack(res.tracks[query.content - 1]);

            if (!queue.isPlaying()) await queue.node.play();
        });

        collector.on('end', (msg, reason) => {
            if (reason === 'time') return inter.followUp({ content:`Tempo de busca esgotado ${inter.member}... Tente de novo ? ❌`, ephemeral: true })
        });
    },
};