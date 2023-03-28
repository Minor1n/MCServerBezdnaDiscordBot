const cron = require('node-cron');
module.exports = (bot, task_memory, point_memory) => {
    function lvl_math() {
        for (let key in point_memory) {
            const pId = point_memory[key];

            const emoji = point_memory[key].lvl_icon;

            const name00 = point_memory[key].lvl;
            const emoji1 = '<:emerald:1009055752360570910>';
            const emoji2 = '<:iron_ingot:1009056417925320725>';
            const emoji3 = '<:gold_ingot:1009057000950345728>';
            const emoji4 = '<:diamond:1009057252394672228>';
            const emoji5 = '<:netherite_Ingot:1009057412902309888>';

            const name1 = 'emerald';
            const name2 = 'iron';
            const name3 = 'gold';
            const name4 = 'diamond';
            const name5 = 'netherite';
            
            if (pId.point >= 25000) {
                if (pId.lvl !== 'netherite') {
                    console.log(key + ' _5');
                    point_memory[key] = lvl_upd_5(key)
                    lvl_report(key, oldLvl = `${emoji} ${name00}`, newLvl = `${emoji5} ${name5}`)
                }
            } else
                if (pId.point >= 10000) {
                    if (pId.lvl !== 'diamond' && pId.lvl !== 'netherite') {
                        console.log(key + ' _4');
                        point_memory[key] = lvl_upd_4(key)
                        lvl_report(key, oldLvl = `${emoji} ${name00}`, newLvl = `${emoji4} ${name4}`)
                    }
                } else
                    if (pId.point >= 5000) {
                        if (pId.lvl !== 'gold' && pId.lvl !== 'diamond' && pId.lvl !== 'netherite') {
                            console.log(key + ' _3');
                            point_memory[key] = lvl_upd_3(key)
                            lvl_report(key, oldLvl = `${emoji} ${name00}`, newLvl = `${emoji3} ${name3}`)
                        }
                    } else
                        if (pId.point >= 1500) {
                            if (pId.lvl !== 'iron' && pId.lvl !== 'gold' && pId.lvl !== 'diamond' && pId.lvl !== 'netherite') {
                                console.log(key + ' _2');
                                point_memory[key] = lvl_upd_2(key)
                                lvl_report(key, oldLvl = `${emoji} ${name00}`, newLvl = `${emoji2} ${name2}`)
                            }
                        } else
                            if (pId.point >= 700) {
                                if (pId.lvl !== 'emerald' && pId.lvl !== 'iron' && pId.lvl !== 'gold' && pId.lvl !== 'diamond' && pId.lvl !== 'netherite') {
                                    console.log(key + ' _1');
                                    point_memory[key] = lvl_upd_1(key)
                                    lvl_report(key, oldLvl = `${emoji} ${name00}`, newLvl = `${emoji1} ${name1}`)
                                }
                            }
        }
    }

    function lvl_upd_5(key) {
        const p = point_memory[key]
        return {
            name: p.name,
            point: p.point,
            taskComplite: p.taskComplite,
            lvl: 'netherite',
            lvl_icon: '<:netherite_Ingot:1009057412902309888>',
            date: p.date
        };
    }
    function lvl_upd_4(key) {
        const p = point_memory[key]
        return {
            name: p.name,
            point: p.point,
            taskComplite: p.taskComplite,
            lvl: 'diamond',
            lvl_icon: '<:diamond:1009057252394672228>',
            date: p.date
        };
    }
    function lvl_upd_3(key) {
        const p = point_memory[key]
        return {
            name: p.name,
            point: p.point,
            taskComplite: p.taskComplite,
            lvl: 'gold',
            lvl_icon: '<:gold_ingot:1009057000950345728>',
            date: p.date
        };
    }
    function lvl_upd_2(key) {
        const p = point_memory[key]
        return {
            name: p.name,
            point: p.point,
            taskComplite: p.taskComplite,
            lvl: 'iron',
            lvl_icon: '<:iron_ingot:1009056417925320725>',
            date: p.date
        };
    }
    function lvl_upd_1(key) {
        const p = point_memory[key]
        return {
            name: p.name,
            point: p.point,
            taskComplite: p.taskComplite,
            lvl: 'emerald',
            lvl_icon: '<:emerald:1009055752360570910>',
            date: p.date
        };
    }
    
    function lvl_report(key, oldLvl, newLvl,) {
        const complite_embed = {
            color: 3092790,
            fields: [
                {
                    name: `Ваш уровень повышен!`,
                    value: `**${oldLvl}** >>> **${newLvl}**`,
                    inline: false
                },
                {
                    name: "INFO",
                    value: `Баллы: **${point_memory[key].point}** \nВсего выполнено заданий: **${point_memory[key].taskComplite}** \nУровень: **${newLvl}**`,
                    inline: false
                },
            ],
        }
        bot.users.fetch(key).then(u => u.send({ embeds: [complite_embed] }))
    }

    cron.schedule('0-59 * * * *',()=>{
        lvl_math()
    });

    bot.on('interactionCreate', interaction => {
        if (!point_memory[interaction.user.id]) {
            point_memory[interaction.user.id] = bot.pointStart(interaction);
        }
    });

    bot.pointStart = interaction => {
        return {
            name: interaction.user.username,
            point: 0,
            taskComplite: 0,
            lvl: 'clay',
            lvl_icon: '<:clay:1009059745174392852>',
            date: 3
        };
    }; //старт поинтов для лошни
}