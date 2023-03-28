const {ModalBuilder, TextInputBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle,TextInputStyle} = require("discord.js");
let mc = require("./mcFetch");
module.exports = (bot, config)=>{
    bot.on("interactionCreate", async interaction=>{
        try{
            if(interaction.isCommand() && interaction.commandName === 'biography'){
               await modal(interaction)
            }
            if(interaction.isModalSubmit() && interaction.customId === 'biographymodal'){
                await post(interaction)
            }
        }catch (e) {console.log(e)}
    })
    async function modal(interaction){
        const modal = new ModalBuilder()
            .setCustomId(`biographymodal`)
            .setTitle('Биография рп персонажа');
        let input = []
        let actionrow = []
        for (let key in config.biography.modal){
            this["modal"+key] = new TextInputBuilder({
                customId: `idmodalwindow${key}`,
                label: config.biography.modal[key].label,
                placeholder: config.biography.modal[key].placeholder,
                style: eval(config.biography.modal[key].style)
            })
            input.push(this["modal"+key],)
        }
        for (let key in input) {
            this["ActionRow"+key] = new ActionRowBuilder().addComponents(input[key]);
            actionrow.push(this["ActionRow"+key])
        }
        modal.addComponents(actionrow)
        interaction.showModal(modal);
    }
    async function post(interaction){
        await interaction.reply({content:'Ожидайте появления биографии!',ephemeral:true})
        const embed ={
            color: 3092790,
            author: {
                name: interaction.user.username,
                icon_url: `https://cdn.discordapp.com/avatars/${interaction.user.id}/${interaction.user.avatar}.jpeg`
            },
            title: `Биография **${interaction.fields.getTextInputValue('idmodalwindow0')}**`,
            description: `${interaction.fields.getTextInputValue('idmodalwindow1')}`,
            image: {
                url: `${await mc.bust(interaction.fields.getTextInputValue('idmodalwindow0'))}`
            }
        }
        await bot.guilds.cache.get('ID').channels.fetch('ID').then(async channel =>
            channel.send({embeds:[embed],}).catch(err =>{interaction.user.send({content:'Ошибка при отправки биографии, сообщите администрации и попробуйте снова'})})
        )
    }
}