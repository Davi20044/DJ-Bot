const maxVol = client.config.opt.maxVol;
module.exports = async ({  inter, queue }) => { 
    if (!queue || !queue.isPlaying()) return inter.editReply({ content: `Nenhuma musica tocando no momento... Tente de novo ? ❌`, ephemeral: true });

    const vol = Math.floor(queue.node.volume + 5)

    if (vol > maxVol ) return inter.editReply({ content: `Não foi possivel subir o volume mais ${inter.member}... Tente de novo ? ❌`, ephemeral: true })

    if (queue.node.volume === vol) return inter.editReply({ content: `O volume desejado já é o atual ${inter.member}... Tente de novo ? ❌`, ephemeral: true });

    const success = queue.node.setVolume(vol);

    return inter.editReply({ content: success ? `O volume foi modificado para **${vol}/${maxVol}%** 🔊` : `Alguma coisa deu errado ${inter.member}... Tente de novo ? ❌`, ephemeral: true});
}