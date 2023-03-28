const {PermissionsBitField,ButtonStyle,ActionRowBuilder,ButtonBuilder} = require("discord.js");
const fs = require('fs');
module.exports = (bot, task_memory, point_memory,id_rineone,id_role_admin_in_bot,id_notify_role,id_channel_dev_log,id_mayor,mem_point_json,mem_task_json) => {
    bot.on('interactionCreate', interaction => {
        if (interaction.commandName === 'info') {
            if(!interaction.options.getUser('user')){
                let name = interaction.username,
                    id = interaction.user.id,
                    avatar = interaction.user.avatar;
                interaction.reply({ embeds: [embedInfo(name,id,avatar)] })
            }else{
                if(point_memory[interaction.options.getUser('user').id]){
                    let name = interaction.options.getUser('user').username,
                        id = interaction.options.getUser('user').id,
                        avatar = interaction.options.getUser('user').avatar;
                    interaction.reply({ embeds: [embedInfo(name,id,avatar)] })
                }else {
                    interaction.reply({content:`Пользователь ${interaction.options.getUser('user')} не зарегистрирован!`,ephemeral:true})
                }
            }
            console.log(`${interaction.user.username}(${interaction.user.id}) запросил info`)
        }
    });//info

    function embedInfo(name,id,avatar){
        const info_embed = {
            color: 3092790,
            author: {
                name: name,
                icon_url: `https://cdn.discordapp.com/avatars/${id}/${avatar}.jpeg`
            },
            fields: [
                {
                    name: 'INFO',
                    value: `Баллы: **${point_memory[id].point
                    }** \nВсего выполнено заданий: **${point_memory[id].taskComplite
                    }** \nУровень: **${point_memory[id].lvl_icon
                    } ${point_memory[id].lvl
                    }** \nОтсрочка: **${point_memory[id].date} дней**`,
                    inline: false
                }
            ]
        }
        return info_embed;
    }

    bot.on('interactionCreate', interaction => {
        if (interaction.commandName === 'all_info') {
            if (interaction.channel.type === 1) {
                if (interaction.user.id === id_rineone || interaction.user.id === id_mayor) {
                    interaction.reply({ files: [mem_point_json, mem_task_json] })
                    console.log(`${interaction.user.username}(${interaction.user.id}) запросил all_info`)
                } else { interaction.reply({ content: 'Недостаточно прав!', ephemeral: true }) }
            }
        }
    });//all_info

    bot.on('interactionCreate', interaction => {
        if (interaction.commandName === 'remove_point') {
            const info_embed = {
                color: 3092790,
                author: {
                    name: interaction.options.getUser('user').username,
                    icon_url: `https://cdn.discordapp.com/avatars/${interaction.options.getUser('user').id}/${interaction.options.getUser('user').avatar}.jpeg`
                },
                fields: [
                    {
                        name: 'Отнятие',
                        value: `Баллы: **${point_memory[interaction.options.getUser('user').id].point
                        } - ${interaction.options.getInteger('point_remove')
                        } = ${point_memory[interaction.options.getUser('user').id].point - interaction.options.getInteger('point_remove')
                        }** \nВсего выполнено заданий: **${point_memory[interaction.options.getUser('user').id].taskComplite}**`,
                        inline: false
                    }
                ]
            }
            if (interaction.channel.type === 1) {
                if (interaction.user.id === id_rineone) {
                    point_memory[interaction.options.getUser('user').id] = bot.remove(interaction)
                    interaction.reply({ embeds: [info_embed] })
                    console.log(`${interaction.user.username}(${interaction.user.id
                    }) забрал у ${interaction.options.getUser('user').username
                    }(${interaction.options.getUser('user').id
                    }) ${interaction.options.getInteger('point_remove')
                    } поинтов`)
                } else { interaction.reply({ content: 'Недостаточно прав!', ephemeral: true }) }
            } else if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator) && !interaction.member.roles.cache.has(id_role_admin_in_bot) && interaction.user.id !== id_rineone) { interaction.reply({ content: 'Недостаточно прав!', ephemeral: true }) }
            else {
                point_memory[interaction.options.getUser('user').id] = bot.remove(interaction)
                interaction.reply({ embeds: [info_embed] })
                console.log(`${interaction.user.username}(${interaction.user.id}) забрал у ${interaction.options.getUser('user').username}(${interaction.options.getUser('user').id}) ${interaction.options.getInteger('point_remove')} поинтов`)
            }
        }
    });//remove_point

    bot.on('interactionCreate', interaction => {
        if (interaction.commandName === 'add_point') {
            const info_embed = {
                color: 3092790,
                author: {
                    name: interaction.options.getUser('user').username,
                    icon_url: `https://cdn.discordapp.com/avatars/${interaction.options.getUser('user').id}/${interaction.options.getUser('user').avatar}.jpeg`
                },
                fields: [
                    {
                        name: 'Выдача',
                        value: `Баллы: **${point_memory[interaction.options.getUser('user').id].point
                        } + ${interaction.options.getInteger('point_add')
                        } = ${point_memory[interaction.options.getUser('user').id].point + interaction.options.getInteger('point_add')
                        }** \nВсего выполнено заданий: **${point_memory[interaction.options.getUser('user').id].taskComplite
                        }**`,
                        inline: false
                    }
                ]
            }
            if (interaction.channel.type === 1) {
                if (interaction.user.id === id_rineone) {
                    point_memory[interaction.options.getUser('user').id] = bot.add(interaction)
                    interaction.reply({ embeds: [info_embed] })
                    console.log(`${interaction.user.username}(${interaction.user.id}) выдал ${interaction.options.getUser('user').username}(${interaction.options.getUser('user').id}) ${interaction.options.getInteger('point_add')} поинтов`)
                } else { interaction.reply({ content: 'Недостаточно прав!', ephemeral: true }) }
            } else if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator) && !interaction.member.roles.cache.has(id_role_admin_in_bot) && interaction.user.id !== id_rineone) { interaction.reply({ content: 'Недостаточно прав!', ephemeral: true }) }
            else {
                point_memory[interaction.options.getUser('user').id] = bot.add(interaction)
                interaction.reply({ embeds: [info_embed] })
                console.log(`${interaction.user.username}(${interaction.user.id}) выдал ${interaction.options.getUser('user').username}(${interaction.options.getUser('user').id}) ${interaction.options.getInteger('point_add')} поинтов`)
            }
        }
    });//add_point

    bot.on('interactionCreate', interaction => {
        if (interaction.commandName === 'date_add') {
            const info_embed = {
                color: 3092790,
                author: {
                    name: interaction.options.getUser('user').username,
                    icon_url: `https://cdn.discordapp.com/avatars/${interaction.options.getUser('user').id}/${interaction.options.getUser('user').avatar}.jpeg`
                },
                fields: [
                    {
                        name: 'Выдача',
                        value: `Отсрочка: **${point_memory[interaction.options.getUser('user').id].date
                        } + ${interaction.options.getInteger('date_add')
                        } = ${point_memory[interaction.options.getUser('user').id].date + interaction.options.getInteger('date_add')
                        }**`,
                        inline: false
                    }
                ]
            }
            if (interaction.channel.type === 1) {
                if (interaction.user.id === id_rineone) {
                    point_memory[interaction.options.getUser('user').id] = bot.date_add(interaction)
                    interaction.reply({ embeds: [info_embed] })
                    console.log(`${interaction.user.username}(${interaction.user.id}) выдал ${interaction.options.getUser('user').username}(${interaction.options.getUser('user').id}) ${interaction.options.getInteger('date_add')} дней отсрочки`)
                } else { interaction.reply({ content: 'Недостаточно прав!', ephemeral: true }) }
            } else if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator) && !interaction.member.roles.cache.has(id_role_admin_in_bot) && interaction.user.id !== id_rineone) { interaction.reply({ content: 'Недостаточно прав!', ephemeral: true }) }
            else {
                point_memory[interaction.options.getUser('user').id] = bot.date_add(interaction)
                interaction.reply({ embeds: [info_embed] })
                console.log(`${interaction.user.username}(${interaction.user.id}) выдал ${interaction.options.getUser('user').username}(${interaction.options.getUser('user').id}) ${interaction.options.getInteger('date_add')} дней отсрочки`)
            }
        }
    });//add_date

    bot.on('interactionCreate', interaction => {
        if (interaction.commandName === 'date_remove') {
            const info_embed = {
                color: 3092790,
                author: {
                    name: interaction.options.getUser('user').username,
                    icon_url: `https://cdn.discordapp.com/avatars/${interaction.options.getUser('user').id}/${interaction.options.getUser('user').avatar}.jpeg`
                },
                fields: [
                    {
                        name: 'Отнятие',
                        value: `Отсрочка: **${point_memory[interaction.options.getUser('user').id].date
                        } - ${interaction.options.getInteger('date_remove')
                        } = ${point_memory[interaction.options.getUser('user').id].date - interaction.options.getInteger('date_remove')
                        }**`,
                        inline: false
                    }
                ]
            }
            if (interaction.channel.type === 1) {
                if (interaction.user.id === id_rineone) {
                    point_memory[interaction.options.getUser('user').id] = bot.date_remove(interaction)
                    interaction.reply({ embeds: [info_embed] })
                    console.log(`${interaction.user.username}(${interaction.user.id}) отнял у ${interaction.options.getUser('user').username}(${interaction.options.getUser('user').id}) ${interaction.options.getInteger('date_add')} дней отсрочки`)
                } else { interaction.reply({ content: 'Недостаточно прав!', ephemeral: true }) }
            } else if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator) && !interaction.member.roles.cache.has(id_role_admin_in_bot) && interaction.user.id !== id_rineone) { interaction.reply({ content: 'Недостаточно прав!', ephemeral: true }) }
            else {
                point_memory[interaction.options.getUser('user').id] = bot.date_remove(interaction)
                interaction.reply({ embeds: [info_embed] })
                console.log(`${interaction.user.username}(${interaction.user.id}) отнял у ${interaction.options.getUser('user').username}(${interaction.options.getUser('user').id}) ${interaction.options.getInteger('date_add')} дней отсрочки`)
            }
        }
    });//remove_date

    bot.remove = (interaction) => {
        let p = point_memory[interaction.options.getUser('user').id];
        return {
            name: p.name,
            point: p.point - interaction.options.getInteger('point_remove'),
            taskComplite: p.taskComplite,
            lvl: p.lvl,
            lvl_icon: p.lvl_icon,
            date : p.date
        }
    }

    bot.add = (interaction) => {
        let p = point_memory[interaction.options.getUser('user').id];
        return {
            name: p.name,
            point: p.point + interaction.options.getInteger('point_add'),
            taskComplite: p.taskComplite,
            lvl: p.lvl,
            lvl_icon: p.lvl_icon,
            date : p.date
        }
    }

    bot.date_add = (interaction)=>{
        let p = point_memory[interaction.options.getUser('user').id];
        return {
            name: p.name,
            point: p.point ,
            taskComplite: p.taskComplite,
            lvl: p.lvl,
            lvl_icon: p.lvl_icon,
            date : p.date + interaction.options.getInteger('date_add')
        }
    }

    bot.date_remove = (interaction)=>{
        let p = point_memory[interaction.options.getUser('user').id];
        return {
            name: p.name,
            point: p.point ,
            taskComplite: p.taskComplite,
            lvl: p.lvl,
            lvl_icon: p.lvl_icon,
            date : p.date - interaction.options.getInteger('date_remove')
        }
    }

    bot.on('messageCreate',message=>{
        if(message.content === 'pik'){
            const regist = new ButtonBuilder()
                .setCustomId("---")
                .setLabel('Зарегистрироваться')
                .setStyle(ButtonStyle.Success);
            message.channel.send({
                content:'Регистрация пользователя.\nНажмите на кнопку для регистрации в системе баллов!',
                components: [
                    new ActionRowBuilder().addComponents(
                       regist
                    ),
                ]
            }).then(message.delete())
        }
    });

    /*bot.on('messageCreate',message=>{
            if(message.content == 'pik'){
                const notify_role_catch = new ButtonBuilder()
                    .setCustomId('notify_role_catch')
                    .setEmoji('🕶️')
                    .setStyle(ButtonStyle.Primary)
                message.channel.send({content:'Получить/Утерять роль <@&1008715763584086157>',components:[new ActionRowBuilder().addComponents(notify_role_catch)]})
            }
        });*/

    bot.on('interactionCreate', interaction => {
        if (interaction.customId === '---') {
            if (!point_memory[interaction.user.id]) {
                interaction.reply({ content: 'Успешно!', ephemeral: true })
            } else { interaction.reply({ content: 'Вы уже зарегистрированы!', ephemeral: true }) }
        }
    });

    bot.on('interactionCreate', interaction => {
        if (interaction.customId === 'notify_role_catch') {
            if (interaction.member.roles.cache.has(id_notify_role)) {
                interaction.reply({ content: 'Роль успешно утеряна!', ephemeral: true })
                interaction.member.roles.remove(id_notify_role)
            } else {
                interaction.reply({ content: 'Роль успешно выдана!', ephemeral: true })
                interaction.member.roles.add(id_notify_role)
            }
        }
    });

    bot.on('messageCreate',message=>{
        if(message.channel.id === id_channel_dev_log){
            message.startThread(
                {
                    name:'Обсуждение',
                    autoArchiveDuration: 60,
                }
            );
        }
    })
}