module.exports = async ({  inter, queue }) => { 
    if (!queue || !queue.isPlaying()) return inter.editReply({ content: `Nenhuma musica tocando no momento... Tente de novo ? ❌`, ephemeral: true });

    if (!queue.history.previousTrack) return inter.editReply({ content: `Não tinha nenhumam musica tocando antes ${inter.member}... Tente de novo ? ❌`, ephemeral: true });

    await queue.history.back();

    inter.editReply({ content:`Tocando a musica **Anterior** ✅`, ephemeral: true});
}
