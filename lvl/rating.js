const {ActionRowBuilder} = require("discord.js");
const cron = require("node-cron");
const fs = require("fs");
module.exports =(bot,task_memory,point_memory,id_mayor,id_guild,id_channel_rating, _id_bot)=>{

    bot.on('messageCreate', async message=>{
        if(message.channel.id ===id_channel_rating){
            if(message.content === 'update'){
                await rating(message)
                message.delete()
            }
        }
    })

    cron.schedule('0 17 * * *',async ()=>{
        await rating()
    })

    async function rating(message) {
        try{
            let arrr = []
            let arr = [];
            for (let key in point_memory) {
                if (key !== id_mayor) {
                    if (point_memory[key].point !== 0 && point_memory[key].point) {
                        point_memory[key].id = key
                        arrr.push(point_memory[key])
                    }
                }
            }
            fs.writeFileSync('./memory/point.json',JSON.stringify(point_memory, null, "\t"));
            arrr.sort(function (a, b) {return b.point - a.point;})
            for(let key in arrr){
                let l = arr.length + 1
                arr.push(
                    {
                        name: `Топ ${l}`,
                        value: `<@${arrr[key].id}>\n${arrr[key].lvl_icon}**${arrr[key].lvl}**\nБаллы: **${arrr[key].point}**\nВыполнено заданий: **${arrr[key].taskComplite}**`,
                        inline: true
                    }
                )
            }
            const emb_rating = {
                color: 3092790,
                title: `Рейтинг`,
                timestamp: new Date().toISOString(),
                fields: arr,
            }
            //await message.channel.send({embeds: [emb_rating]})
            await bot.channels.cache.get(id_channel_rating).messages.fetch('ID').then((msg) => {
                msg.edit({embeds: [emb_rating]})
            })
        }catch (e) {console.log(e)}
    }
}