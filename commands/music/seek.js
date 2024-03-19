const ms = require('ms');
const {  ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');
const { useMainPlayer, useQueue  } = require('discord-player');

module.exports = {
    name: 'seek',
    description: 'Retrocede ou avança uma musica',
    voiceChannel: true,
    options: [
    {
        name: 'time',
        description: 'Tempo que voce deseja pular',
        type: ApplicationCommandOptionType.String,
        required: true,
    }
    ],
    async execute({ inter }) {
        const player = useMainPlayer()

const queue = useQueue(inter.guild);

        if (!queue || !queue.isPlaying()) return inter.editReply({ content: `Nenhuma musica tocando no momento ${inter.editReply}... Tente de novo ? ❌`, ephemeral: true });

        const timeToMS = ms(inter.options.getString('time'));

        if (timeToMS >= queue.currentTrack.durationMS) return inter.editReply({ content:`O tempo indicado é maior do que o tempo total da musica atual ${inter.member}... Tente de novo ? ❌\n*Try for example a valid time like **5s, 10s, 20 seconds, 1m**...*`, ephemeral: true });

        await queue.node.seek(timeToMS);

        const SeekEmbed = new EmbedBuilder()
        .setColor('#2f3136')
        .setAuthor({name: `Tempo definido na musica atual **${ms(timeToMS, { long: true })}** ✅`})


        inter.editReply({ embeds: [SeekEmbed] });
    },
};