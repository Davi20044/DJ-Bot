module.exports = async ({  inter, queue }) => { 
    if (!queue || !queue.isPlaying()) return inter.editReply({ content: `Nenhuma musica tocando no momento... Tente de novo ? ❌`, ephemeral: true });
    
    const success = queue.node.skip();

    return inter.editReply({ content: success ? `Musica atual **${queue.currentTrack.title}** Pulada ✅` : `Alguma coia deu errado ${inter.member}... Tente de novo ? ❌`, ephemeral: true});
}