const cron = require('node-cron');
const {ActivityType, ApplicationCommandOptionType} = require("discord.js");
const fs = require("fs");
module.exports = (bot,task_memory,point_memory,grind_memory)=>{
    setInterval(()=>{
        fs.writeFileSync('./memory/task.json',JSON.stringify(task_memory, null, "\t"));
        fs.writeFileSync('./memory/point.json',JSON.stringify(point_memory, null, "\t"));
        fs.writeFileSync('./memory/grind.json',JSON.stringify(grind_memory, null, "\t"));
    }, 1000*5);

    cron.schedule('0-59 * * * *',()=>{
        let arr = [];
        arr.push({name: `Astral Step`, type: ActivityType.Listening})
        arr.push({name: `❤️Minorin`, type: ActivityType.Watching})
        arr.push({name: `❄️Minorin`, type: ActivityType.Watching})
        arr.push({name: `☃️со снеговиком`, type: ActivityType.Playing})
        arr.push({name: `🌨️на снегопад`, type: ActivityType.Watching})
        arr.push({name: `🎁новогодние плейлисты`, type: ActivityType.Listening})

        let arrRand = arr[Math.floor(Math.random() * arr.length)];
        bot.user.setPresence({activities: [arrRand]});
    });
    bot.on('ready',bot=>{
        console.log('ready')

        /*bot.application.commands.create({
            name: "task",
            description: "Задание для жителей",
            options: [
                {
                    name:'task_name',
                    description:'Укажите задание для жителей',
                    type: ApplicationCommandOptionType.String,
                    required: true
                },
                {
                    name:'task_point',
                    description:'Укажите кол-во балов',
                    type: ApplicationCommandOptionType.Integer,
                    required: true
                },
            ],
            defaultPermission: true
        });*/
        /*bot.application.commands.create({
            name:'info',
            description:'Информация о вас',
            options:[
                {
                    name:'user',
                    description:'Выберите пользователя',
                    type: ApplicationCommandOptionType.User,
                    required: false,
                }
            ],
            defaultPermission: true
        });*/
        /*bot.application.commands.create({
            name:'all_info',
            description:'Получить информацию о всех пользователях (только администрация)',
            defaultPermission: true
        });*/
        /*bot.application.commands.create({
            name:'remove_point',
            description:'Забрать баллы',
            options:[
                {
                    name:'user',
                    description:'Выберите пользователя',
                    type: ApplicationCommandOptionType.User,
                    required: true
                },
                {
                    name:'point_remove',
                    description:'Укажите кол-во балов',
                    type: ApplicationCommandOptionType.Integer,
                    required: true
                }
            ],
            defaultPermission: true
        })*/
        /*bot.application.commands.create({
            name:'add_point',
            description:'Выдать баллы',
            options:[
                {
                    name:'user',
                    description:'Выберите пользователя',
                    type: ApplicationCommandOptionType.User,
                    required: true
                },
                {
                    name:'point_add',
                    description:'Укажите кол-во балов',
                    type: ApplicationCommandOptionType.Integer,
                    required: true
                }
            ],
            defaultPermission: true
        })*/
        /*bot.application.commands.create({
            name:'date_add',
            description:'Увеличить отсрочку пользователя',
            options:[
                {
                    name:'user',
                    description:'Выберите пользователя',
                    type: ApplicationCommandOptionType.User,
                    required:true
                },
                {
                    name:'date_add',
                    description:'Укажите количество дней',
                    type: ApplicationCommandOptionType.Integer,
                    required:true
                }
            ],
            defaultPermission: true
        })
        bot.application.commands.create({
            name:'date_remove',
            description:'Сократить отсрочку пользователя',
            options:[
                {
                    name:'user',
                    description:'Выберите пользователя',
                    type: ApplicationCommandOptionType.User,
                    required:true
                },
                {
                    name:'date_remove',
                    description:'Укажите количество дней',
                    type: ApplicationCommandOptionType.Integer,
                    required:true
                }
            ],
            defaultPermission: true
        })*/
    });
}