const { QueueRepeatMode, useMainPlayer, useQueue } = require('discord-player');
const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'loop',
    description: 'Ativa/Desativa o loop de musicas ou de toda a fila',
    voiceChannel: true,
    options: [
        {
        name: 'action' ,
        description: 'Qual ação voce deseja executar no Loop',
        type: ApplicationCommandOptionType.String,
        required: true,
        choices: [
            { name: 'Queue', value: 'enable_loop_queue' },
            { name: 'Disable', value: 'disable_loop'},
            { name: 'Song', value: 'enable_loop_song' },
            { name: 'autoplay', value: 'enable_autoplay' },
        ],
    }
    ],
    execute({ inter }) {
        const player = useMainPlayer()

const queue = useQueue(inter.guild);
        let BaseEmbed = new EmbedBuilder()
        .setColor('#2f3136')

        if (!queue || !queue.isPlaying()) return inter.editReply({ content: `Nenhuma musica tocando no momento ${inter.member}... Tente de novo ? ❌`, ephemeral: true });
        switch (inter.options._hoistedOptions.map(x => x.value).toString()) {
            case 'enable_loop_queue': {
                if (queue.repeatMode === QueueRepeatMode.TRACK) return inter.editReply({ content:`Voce deve primeiro desabilitar a musica atual do modo loop (/loop Disable) ${inter.member}... Tente de novo ? ❌`, ephemeral: true });

                const success = queue.setRepeatMode(QueueRepeatMode.QUEUE);
                
                BaseEmbed.setAuthor({ name: success ? `Alguma coisa deu errado ${inter.member}... Tente de novo ? ❌` : `Modo de repetição ativado, toda a fila será reproduzida indefinidamente 🔁` })

                return inter.editReply({ embeds: [BaseEmbed] });
                
            }
            case 'disable_loop': {
                if (queue.repeatMode === QueueRepeatMode.OFF) return inter.editReply({ content:`Voce deve primeiro ativar o modo loop (/loop Queue or /loop Song) ${inter.member}... Tente de novo ? ❌`, ephemeral: true });
                
                const success = queue.setRepeatMode(QueueRepeatMode.OFF);

                BaseEmbed.setAuthor({ name: success ? `Alguma coisa deu errado ${inter.member}... Tente de novo ? ❌` : `Modo de repetição desativado, a fila não será mais repetida 🔁`})

                return inter.editReply({ embeds: [BaseEmbed] });
                
            }
            case 'enable_loop_song': {
                if (queue.repeatMode === QueueRepeatMode.QUEUE) return inter.editReply({ content:`Voce deve primeiro desabilitar a musica atual do modo loop (/loop Disable) ${inter.member}... Tente de novo ? ❌`, ephemeral: true });

                const success = queue.setRepeatMode(QueueRepeatMode.TRACK);

                BaseEmbed.setAuthor({ name: success ? `Alguma coisa deu errado ${inter.member}... Tente de novo ? ❌` : `Modo de repetiçao ativado, a musica será repetida indefinidamente (Voce pode encerrar o modo loop com /loop disable)` })

                return inter.editReply({ embeds: [BaseEmbed] });
                
            }
            case 'enable_autoplay': {
                if (queue.repeatMode === QueueRepeatMode.AUTOPLAY) return inter.editReply({ content:`Voce deve primeiro desabilitar a musica atual do modo loop (/loop Disable) ${inter.member}... Tente de novo ? ❌`, ephemeral: true });

                const success = queue.setRepeatMode(QueueRepeatMode.AUTOPLAY);

                BaseEmbed.setAuthor({ name: success ? `Alguma coisa deu errado ${inter.member}... Tente de novo ? ❌` : `Reprodução automatica ativada, a fila será preenchida automaticamnete com musicas semelhantes á atual 🔁` })

                return inter.editReply({ embeds: [BaseEmbed] });

            }
        }
       
    },
};