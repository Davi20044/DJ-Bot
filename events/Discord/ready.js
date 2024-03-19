module.exports = async (client) => {
    console.log(`Logged com o client ${client.user.username}\nPronto para tocar algumas musicas!`);
    client.user.setActivity(client.config.app.playing);   
};