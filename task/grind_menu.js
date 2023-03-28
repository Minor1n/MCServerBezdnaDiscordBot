const {SelectMenuBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ChannelType} = require("discord.js")
module.exports = (bot,task_memory,point_memory,grind_memory,id_mayor,id_rineone)=>{
    const grind_json =[
        'белого бетона',
        'диорита',
        'кальцита',
        'тёмного дуба',
        'ели',
        'дуба',
        'берёзы',
        'андезита',
        //'булыжника',
        //'камня',
        //'дёрна'
    ]
    bot.on('messageCreate',message=>{
        if(message.channel.id === 'ID'){
            if(message.content === '!SEND'){
                const arr = []

                for (let key in grind_json){
                    let l = arr.length
                    arr.push(
                        {
                            label:`Шалкер ${grind_json[key]}`,
                            description: `Добыть и принести на склад шалкер ${grind_json[key]}`,
                            value: `${l}`,
                        }
                    );
                }
                const menu_select = new SelectMenuBuilder()
                    .setCustomId('grind_select_menu')
                    .setPlaceholder('Ничего не выбрано')
                    .addOptions(arr)
                const menu_embed = {
                    color: 3092790,
                    title:`Гринд задания`,
                    description:`Задания за которое вы получите 100 балов и 1 день отсрочки`,
                }
                message.channel.send({
                    embeds:[menu_embed],
                    components: [
                        new ActionRowBuilder().addComponents(
                            menu_select
                        ),
                    ],
                })
            }
        }

    });

    bot.on('interactionCreate',interaction=>{
        if(interaction.customId ==='grind_select_menu'){
            interaction.reply({content:`Вы приняли задание: **Добыть шалкер ${grind_json[interaction.values]}**`,ephemeral:true})

            interaction.guild.channels
                .create({
                    name: `${interaction.user.username} Добыть шалкер ${grind_json[interaction.values]}`,
                    type: ChannelType.GuildText,
                })
                .then((channel)=>{
                    channel.setParent('ID');
                    channel.permissionOverwrites.edit(interaction.guild.id, {
                        ViewChannel: false,
                    });
                    channel.permissionOverwrites.edit(interaction.guild.roles.everyone, {
                        ViewChannel: false,
                    });
                    channel.permissionOverwrites.edit(interaction.user.id, {
                        ViewChannel: true,
                    });
                    const g1 = new ButtonBuilder()
                        .setCustomId("g11")
                        .setLabel("👍 выполнил")
                        .setStyle(ButtonStyle.Success);
                    const g2 = new ButtonBuilder()
                        .setCustomId("g22")
                        .setLabel("👎 отказаться")
                        .setStyle(ButtonStyle.Danger);
                    const g3 = new ButtonBuilder()
                        .setCustomId("g33")
                        .setLabel(interaction.user.username)
                        .setStyle(ButtonStyle.Secondary)
                        .setDisabled(true);
                    channel.send({
                        content: `Добыть шалкер ${grind_json[interaction.values]}`,
                        components: [
                            new ActionRowBuilder().addComponents(
                                g1,
                                g2,
                                g3
                            ),
                        ],
                    })
                        .then((message)=>{
                            grind_memory[message.id] = startGrind(interaction)
                        })
                })
        }
    });

    bot.on('interactionCreate',interaction=>{
        if(interaction.customId === 'g11'){
            if(interaction.user.id === grind_memory[interaction.message.id].user_id){
                const gr_button1 = new ButtonBuilder()
                    .setCustomId("gr_button11")
                    .setLabel("👍 выполнено")
                    .setStyle(ButtonStyle.Success);
                const gr_button2 = new ButtonBuilder()
                    .setCustomId("gr_button22")
                    .setLabel("👎 не выполнено")
                    .setStyle(ButtonStyle.Danger);
                const gr_button3 = new ButtonBuilder()
                    .setCustomId("gr_button33")
                    .setLabel(
                        `${grind_memory[interaction.message.id].user_name}`
                    )
                    .setStyle(ButtonStyle.Secondary)
                    .setDisabled(true);

                interaction.update({
                    components: [new ActionRowBuilder().addComponents(
                        gr_button1,
                        gr_button2,
                        gr_button3
                    )]
                })
                    .then(
                        interaction.message.reply({
                            content: `<@${id_mayor}>, игрок <@${interaction.user.id}> выполнил задание! \nЕсли это так подтвердите`,
                        })
                    )

            }else{ interaction.reply({ content: 'Недостаточно прав!', ephemeral: true }) }
        }
    });

    bot.on('interactionCreate',interaction=>{
        if(interaction.customId === 'g22'){
            if(interaction.user.id !== grind_memory[interaction.message.id].user_id){ interaction.reply({ content: 'Недостаточно прав!', ephemeral: true }) }
            else{
                grind_memory[interaction.message.id] = remove()
                interaction.channel.delete()
            }
        }
    });

    bot.on('interactionCreate',interaction=>{
        if(interaction.customId === 'gr_button11'){
            if(interaction.user.id !== id_mayor && interaction.user.id !== id_rineone){ interaction.reply({ content: 'Недостаточно прав!', ephemeral: true }) }
            else{
                bot.users.fetch(grind_memory[interaction.message.id].user_id).then(u => u.send('+100'))
                    .then(point_memory[grind_memory[interaction.message.id].user_id] = grComplete(interaction))
                    .then(grind_memory[interaction.message.id] = remove())
                    .then(interaction.channel.delete());
            }
        }
    });

    bot.on('interactionCreate',interaction=>{
        if(interaction.customId === 'gr_button22'){
            if(interaction.user.id !== id_mayor && interaction.user.id !== id_rineone){ interaction.reply({ content: 'Недостаточно прав!', ephemeral: true }) }
            else{
                const g1 = new ButtonBuilder()
                    .setCustomId("g11")
                    .setLabel("👍 выполнил")
                    .setStyle(ButtonStyle.Success);
                const g2 = new ButtonBuilder()
                    .setCustomId("g22")
                    .setLabel("👎 отказаться")
                    .setStyle(ButtonStyle.Danger);
                const g3 = new ButtonBuilder()
                    .setCustomId("g33")
                    .setLabel(interaction.user.username)
                    .setStyle(ButtonStyle.Secondary)
                    .setDisabled(true);
                interaction.update({
                    components: [new ActionRowBuilder().addComponents(
                        g1,
                        g2,
                        g3
                    )]
                })
                bot.users.fetch(grind_memory[interaction.message.id].user_id).then(u => u.send(`Задание не выполнено, подробности в <#${interaction.channel.id}>`))
            }
        }
    })

    function remove() {
    }

    function startGrind(interaction) {
        return{
            user_name: interaction.user.username,
            user_id: interaction.user.id,
            task: grind_json[interaction.values],
        }
    }

    function grComplete(interaction) {
        const p = point_memory[grind_memory[interaction.message.id].user_id];
        const t = grind_memory[interaction.message.id]
        return {
            name: p.name,
            id: p.id,
            point: p.point + 100 ,
            taskComplite: p.taskComplite,
            lvl: p.lvl,
            lvl_icon: p.lvl_icon,
            date: p.date + 1
        };
    }
}