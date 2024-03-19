const maxVol = client.config.opt.maxVol;
const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');
const { useMainPlayer, useQueue  } = require('discord-player');

module.exports = {
    name: 'volume',
    description: 'Ajusta a volume',
    voiceChannel: true,
    options: [
        {
            name: 'volume',
            description: 'O volume desejado',
            type: ApplicationCommandOptionType.Number,
            required: true,
            minValue: 1,
            maxValue: maxVol
        }
    ],

    execute({ inter }) {
        const player = useMainPlayer()

const queue = useQueue(inter.guild);

        if (!queue) return inter.editReply({ content: `Nenhuma musica tocando no momento ${inter.member}... Tente de novo ? ❌`, ephemeral: true });
        const vol = inter.options.getNumber('volume')

        if (queue.node.volume === vol) return inter.editReply({ content: `O volume desejado já é o atual ${inter.member}... Tente de novo ? ❌`, ephemeral: true });

        const success = queue.node.setVolume(vol);

       return inter.editReply({ content: success ? `O Volume foi modificado para **${vol}/${maxVol}%** 🔊` : `Alguma coisa de errado ${inter.member}... Tente de novo ? ❌` });
    },
};