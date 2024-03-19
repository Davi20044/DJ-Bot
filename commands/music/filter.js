const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');
const { useMainPlayer, useQueue  } = require('discord-player');

module.exports = {
    name: 'filter',
    description: 'Adicione um filtro a sua faixa',
    voiceChannel: true,
    options: [
        {
            name: 'filter',
            description: 'Filtro que deseja adicionar',
            type: ApplicationCommandOptionType.String,
            required: true,
            choices: [...Object.keys(require("discord-player").AudioFilters.filters).map(m => Object({ name: m, value: m })).splice(0, 25)],
        }
    ],


    async execute({ inter }) {
const queue = useQueue(inter.guild);
        const player = useMainPlayer()

        if (!queue || !queue.isPlaying()) return inter.editReply({ content: `Nenhuma musica tocando no momento ${inter.member}... Tente de novo ? ❌`, ephemeral: true });

        const actualFilter = queue.filters.ffmpeg.getFiltersEnabled()[0];

        const infilter = inter.options.getString('filter');


        const filters = [];

        queue.filters.ffmpeg.getFiltersEnabled().map(x => filters.push(x));
        queue.filters.ffmpeg.getFiltersDisabled().map(x => filters.push(x));

        const filter = filters.find((x) => x.toLowerCase() === infilter.toLowerCase().toString());

        if (!filter) return inter.editReply({ content: `Esse filtro não existe ${inter.member}... Tente de novo ? ❌\n${actualFilter ? `Filtro ativo no momento ${actualFilter}.\n` : ''}Lista de filtros disponiveis ${filters.map(x => `${x}`).join(', ')}.`, ephemeral: true });

        await queue.filters.ffmpeg.toggle(filter)

        const FilterEmbed = new EmbedBuilder()
        .setAuthor({name: `O Filtro ${filter} esta agora ${queue.filters.ffmpeg.isEnabled(filter) ? 'Ativado' : 'Desativado'} ✅\n*Lembrete: Quanto mais longa a musica, mais vai demorar.*`})
        .setColor('#2f3136')

       return inter.editReply({ embeds: [FilterEmbed] });
    },
};