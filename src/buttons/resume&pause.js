module.exports = async ({ inter, queue }) => {
    if (!queue || !queue.isPlaying()) return inter.editReply({ content: `Nenhuma musica tocando no momento... Tente de novo ? ❌`, ephemeral: true });

    const resumed = queue.node.resume();
    let message = `Musica atual **${queue.currentTrack.title}** Tocando ✅`;
    
    if (!resumed) {
        queue.node.pause();
        message = `Musica atual **${queue.currentTrack.title}** Pausada ✅`;
    }

    return inter.editReply({
        content: message, ephemeral: true
    });
}