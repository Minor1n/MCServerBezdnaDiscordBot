const { ChannelType, PermissionsBitField, ButtonStyle, Client, Intents, MessageSelectMenu, MessageActionRow, MessageButton, Modal, TextInputComponent, MessageEmbed, Collection, ActionRowBuilder, ButtonBuilder, Embed,} = require("discord.js");
const cron = require('node-cron');
let date = new Date();
module.exports = (bot,task_memory,point_memory)=>{
    function upd_point() {
        for (let key in point_memory){
            if (point_memory[key].date === 0){
                if(point_memory[key].point >= 10){
                    point_memory[key] = remove_point(key)
                }
            }
        }
    }
    function upd_date() {
        for (let key in point_memory){
            if(point_memory[key].date === 1) {
                const complite_embed = {
                    color: 3092790,
                    fields: [
                        {
                            name: `Внимание! Ваша отсрочка закончена!`,
                            value: `Вы теряете по 10 поинтов каждый час! Чтобы это исправить выполните любое задание`,
                            inline: false
                        },
                        {
                            name: "INFO",
                            value: `Баллы: **${point_memory[key].point}** \nВсего выполнено заданий: **${point_memory[key].taskComplite}** \nУровень: **${point_memory[key].lvl}** \nОтсрочка: **${point_memory[key].date-1} дней**`,
                            inline: false
                        },
                    ],
                }
                bot.users.fetch(key).then(u => u.send({embeds: [complite_embed]}))
                console.log(point_memory[key].user , point_memory[key])
            }
            if(point_memory[key].date !== 0){
                point_memory[key] = remove_date(key)
            }
        }
    }
    function remove_point(key) {
        let p = point_memory[key]
        return{
            name:p.name,
            point:p.point - 10,
            taskComplite: p.taskComplite,
            lvl:p.lvl,
            lvl_icon:p.lvl_icon,
            date: p.date
        }
    }
    function remove_date(key) {
        let p = point_memory[key]
        return{
            name:p.name,
            point:p.point,
            taskComplite: p.taskComplite,
            lvl:p.lvl,
            lvl_icon:p.lvl_icon,
            date: p.date - 1
        }
    }

    cron.schedule('0 17 * * *', () => {
        let date = new Date();
        upd_date()
        console.log(`Отсрочка  обновлена в ${date.getHours()} : ${date.getMinutes()} : ${date.getSeconds()}`)
    });//отнятие отсрочки
    cron.schedule('30 0-23 * * *', ()=>{
        let date = new Date();
        upd_point()
        console.log(`Поинты обновлены в ${date.getHours()} : ${date.getMinutes()} : ${date.getSeconds()}`)
    });//отнятие баллов
}