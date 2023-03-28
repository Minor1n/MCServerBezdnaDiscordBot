const Discord = require('discord.js'),
    config = require('./config.json'),
    {GatewayIntentBits, Partials, PermissionsBitField,} = require('discord.js');
bot = new Discord.Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.DirectMessageTyping,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
    partials: [
        Partials.Channel
    ]
});
bot.login(config.token);

const task_memory = require('./memory/task.json');
const point_memory = require('./memory/point.json');
const grind_memory = require("./memory/grind.json");

const _id_bot = 'ID'

const id_rineone = 'ID';
const id_role_admin_in_bot = 'ID';
const id_category_task_channel = 'ID';
const id_mayor = 'ID';
const id_guild = 'ID';
const id_channel_rating = 'ID';
const id_notify_role = 'ID';
const id_channel_dev_log ='ID'

require('./lvl/boigraphy')(bot,config)

require('./client_help/client_help')(bot,task_memory,point_memory,grind_memory)
require('./task/task')(bot,task_memory,point_memory,id_category_task_channel,id_rineone)
require('./task/task_sub')(bot, task_memory, point_memory,id_rineone,id_role_admin_in_bot,id_notify_role,
    id_channel_dev_log,id_mayor,'./memory/point.json','./memory/task.json')
require('./lvl/lvl')(bot,task_memory,point_memory)
require('./lvl/point_return')(bot,task_memory,point_memory)
require('./lvl/rating')(bot,task_memory,point_memory,id_mayor,id_guild,id_channel_rating, _id_bot)
require('./task/grind_menu')(bot,task_memory,point_memory,grind_memory,id_mayor,id_rineone)
bot.on('ready',async bot =>{
    let api = await fetch(`https://api.mojang.com/users/profiles/minecraft/Steve`);
    if (api.ok) {
        console.log('online')
    } else {
        console.log('not online')
    }
    await bot.application.commands.create({
        name: "biography",
        description: "Биография",
        defaultPermission: true,
    })
})