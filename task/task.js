const {ChannelType, ButtonStyle, ActionRowBuilder, ButtonBuilder,} = require("discord.js");
module.exports = (bot, task_memory, point_memory,id_category_task_channel,id_rineone) => {
	bot.on("interactionCreate", interaction => {
		if (interaction.commandName === "task") {
			if (task_memory.in_progress[interaction.options.getString("task_name")]) {
				interaction.reply({
					content: `Переформулируйте задание, задание **${interaction.options.getString(
						"task_name"
					)}** уже существуе!`,
					ephemeral: true,
				});
			} else if (
				!task_memory.in_progress[interaction.options.getString("task_name")]
			) {
				const task_button_point = new ButtonBuilder()
					.setCustomId("task_button_ball_custom_id")
					.setLabel(`${interaction.options.getInteger("task_point")}`)
					.setStyle(ButtonStyle.Secondary)
					.setDisabled(true);

				const task_button = new ButtonBuilder()
					.setCustomId("task_button_custom_id")
					.setLabel("✊ принять задание")
					.setStyle(ButtonStyle.Primary);
				const task_button_break = new ButtonBuilder()
					.setCustomId("task_button_ball_custom_id_break")
					.setEmoji(`✖️`)
					.setStyle(ButtonStyle.Danger);

				interaction.reply({
					content: interaction.options.getString("task_name"),
					components: [
						new ActionRowBuilder().addComponents(
							task_button,
							task_button_point,
							task_button_break
						),
					],
				});
				task_memory.in_progress[
					`${interaction.options.getString("task_name")}`
				] = bot.taskStart(interaction);
			}
		}
	}); //task command

	bot.on("interactionCreate", interaction => {
		if (interaction.customId === "task_button_ball_custom_id_break") {
			if (interaction.user.id !== task_memory.in_progress[interaction.message.content].user_id && interaction.user.id !==id_rineone) {interaction.reply({ content: "Недостаточно прав!", ephemeral: true });}
			else {
				task_memory.in_progress[interaction.message.content] =
					bot.removeTask(interaction);
				interaction.message.delete();
			}
		}
	}); //кнопачка закрытия юзается

	bot.on("interactionCreate", interaction => {
		if (interaction.customId === "task_button_custom_id") {
			const task_new_button_point = new ButtonBuilder()
				.setCustomId("task_button_ball_custom_id")
				.setLabel(
					task_memory.in_progress[interaction.message.content].pointString
				)
				.setStyle(ButtonStyle.Secondary)
				.setDisabled(true);
			const task_button_break = new ButtonBuilder()
				.setCustomId("task_button_ball_custom_id_break")
				.setEmoji(`✖️`)
				.setStyle(ButtonStyle.Danger)
				.setDisabled(true);

			const task_new_button = new ButtonBuilder()
				.setCustomId("task_button_custom_id")
				.setLabel(`✊ задание принято`)
				.setStyle(ButtonStyle.Primary)
				.setDisabled(true);
			const task_new_button_point_user = new ButtonBuilder()
				.setCustomId("task_button_ball_custom_id212")
				.setLabel(
					interaction.user.username
				)
				.setStyle(ButtonStyle.Secondary)
				.setDisabled(true);
			interaction.update({
				components: [
					new ActionRowBuilder().addComponents(
						task_new_button,
						task_new_button_point,
						task_new_button_point_user,
						task_button_break,
					),
				],
			});

			interaction.guild.channels
				.create({
					name: `⚪${interaction.message.content.slice(0, 90)}`,
					type: ChannelType.GuildText,
				})
				.then(channel => {
					channel.setParent(
						id_category_task_channel
					);
					channel.permissionOverwrites.edit(interaction.guild.id, {
						ViewChannel: false,
					});
					channel.permissionOverwrites.edit(interaction.guild.roles.everyone, {
						ViewChannel: false,
					});
					channel.permissionOverwrites.edit(interaction.user.id, {
						ViewChannel: true,
					});
					channel.permissionOverwrites.edit(
						task_memory.in_progress[interaction.message.content].user_id,
						{ ViewChannel: true }
					);

					const task_button_point_new_channel = new ButtonBuilder()
						.setCustomId("task_button_ball_custom_id")
						.setLabel(
							task_memory.in_progress[interaction.message.content].pointString
						)
						.setStyle(ButtonStyle.Secondary)
						.setDisabled(true);

					const task_button_new_channel = new ButtonBuilder()
						.setCustomId("task_button_new_channel_custom_id")
						.setLabel("👍 выполнил")
						.setStyle(ButtonStyle.Success);
					const task_button_new_channel_lose = new ButtonBuilder()
						.setCustomId("task_button_new_channel_custom_id_lose")
						.setLabel("👎 отказаться")
						.setStyle(ButtonStyle.Danger);
					const _task_new_button_point_user = new ButtonBuilder()
						.setCustomId("task_button_ball_custom_id121")
						.setLabel(
							interaction.user.username
						)
						.setStyle(ButtonStyle.Secondary)
						.setDisabled(true);
					channel.send({
						content: `${interaction.message.content}`,
						components: [
							new ActionRowBuilder().addComponents(
								task_button_new_channel,
								task_button_new_channel_lose,
								_task_new_button_point_user,
								task_button_point_new_channel,
							),
						],
					});
					task_memory.in_progress[interaction.message.content] =
						bot.workerAdd(interaction);
				});
		}
	}); //кнопачка принять задание юзается

	bot.on("interactionCreate", interaction => {
		if (interaction.customId === "task_button_new_channel_custom_id") {
			const task_button_task_complite = new ButtonBuilder()
				.setCustomId("task_button_task_complite_custom_id")
				.setLabel("👍 выполнено")
				.setStyle(ButtonStyle.Success);
			const _task_button_task_no_complite = new ButtonBuilder()
				.setCustomId("1task_button_task_no_complite_custom_id")
				.setLabel("👎 не выполнено")
				.setStyle(ButtonStyle.Danger)
			const __task_new_button_point_user = new ButtonBuilder()
				.setCustomId("1task_button_ball_custom_id121")
				.setLabel(
					interaction.user.username
				)
				.setStyle(ButtonStyle.Secondary)
				.setDisabled(true);
			const _task_button_point_new_channel = new ButtonBuilder()
				.setCustomId("1task_button_ball_custom_id")
				.setLabel(
					task_memory.in_progress[interaction.message.content].pointString
				)
				.setStyle(ButtonStyle.Secondary)
				.setDisabled(true);
			interaction.channel.setName(`🟢${interaction.message.content.slice(0, 90)}`)

			interaction.update({
				components: [new ActionRowBuilder().addComponents(
					task_button_task_complite,
					_task_button_task_no_complite,
					__task_new_button_point_user,
					_task_button_point_new_channel,
				)]
			})
				.then(
					interaction.message.reply({
						content: `<@${task_memory.in_progress[interaction.message.content].user_id}>, игрок <@${interaction.user.id}> выполнил задание! \nЕсли это так подтвердите`,
					})
				)
		}
	}); //кнопачка выполнил юзается

	bot.on("interactionCreate", interaction => {
		if (interaction.customId === "task_button_new_channel_custom_id_lose") {
			const task_button_task_lose = new ButtonBuilder()
				.setCustomId("task_button_task_lose_custom_id")
				.setLabel("Откатить задание")
				.setStyle(ButtonStyle.Primary);
			const _task_new_button_point_user = new ButtonBuilder()
				.setCustomId("task_button_ball_custom_id121")
				.setLabel(
					interaction.user.username
				)
				.setStyle(ButtonStyle.Secondary)
				.setDisabled(true);
			const task_new_button_point = new ButtonBuilder()
				.setCustomId("task_button_ball_custom_id")
				.setLabel(
					task_memory.in_progress[interaction.message.content].pointString
				)
				.setStyle(ButtonStyle.Secondary)
				.setDisabled(true);
			interaction.channel.setName(`🔴${interaction.message.content.slice(0, 90)}`)
			interaction.update({
				components: [
					new ActionRowBuilder().addComponents(
						task_button_task_lose,
						_task_new_button_point_user,
						task_new_button_point,
					),
				],
			})
				.then(
					interaction.message.reply({
						content: `<@${task_memory.in_progress[interaction.message.content].user_id}>, игрок <@${interaction.user.id}> отказался от задания!`,
					})
				);
		}
	}); //кнопачка отказаться юзается

	bot.on("interactionCreate", interaction => {
		if (interaction.customId === "task_button_task_complite_custom_id") {
			if (
				interaction.user.id !==
				task_memory.in_progress[interaction.message.content].user_id && interaction.user.id !==id_rineone
			) {
				interaction.reply({ content: "Ожидайте!", ephemeral: true });
			}
			else {
				const task_button_point = new ButtonBuilder()
					.setCustomId("task_button_ball_custom_id")
					.setLabel(
						`${task_memory.in_progress[interaction.message.content].pointString
						}`
					)
					.setStyle(ButtonStyle.Secondary)
					.setDisabled(true);

				const task_button = new ButtonBuilder()
					.setCustomId("task_button_custom_id")
					.setLabel("✊ задание выполнено")
					.setStyle(ButtonStyle.Success)
					.setDisabled(true);
				const task_button123212321 = new ButtonBuilder()
					.setCustomId("task_button_custom_id12")
					.setLabel(
						`${task_memory.in_progress[interaction.message.content].worker.name
						}`
					)
					.setStyle(ButtonStyle.Secondary)
					.setDisabled(true);

				interaction.guild.channels.cache
					.get(task_memory.in_progress[interaction.message.content].channelId)
					.messages.fetch(
						task_memory.in_progress[interaction.message.content].messageId
					)
					.then(m => {
						m.edit({
							content: `${interaction.message.content}`,
							components: [
								new ActionRowBuilder().addComponents(
									task_button,
									task_button_point,
									task_button123212321
								),
							],
						});
					});
				point_memory[
					task_memory.in_progress[interaction.message.content].worker.id
				] = bot.taskCompliteAdd(interaction);
				task_memory.complite[
					task_memory.in_progress[interaction.message.content].messageId
				] = bot.taskCompliteAddAdd(interaction);


				const complite_embed = {
					color: 3092790,
					fields: [
						{
							name: "Задание выполнено!",
							value: `Задание: **${interaction.message.content}** \nБаллы задания: **${task_memory.in_progress[interaction.message.content].pointString}**`,
							inline: false
						},
						{
							name: "INFO",
							value: `Баллы: **${point_memory[task_memory.in_progress[interaction.message.content].worker.id].point}** \nВсего выполнено заданий: **${point_memory[task_memory.in_progress[interaction.message.content].worker.id].taskComplite}** \nУровень: **${point_memory[task_memory.in_progress[interaction.message.content].worker.id].lvl_icon} ${point_memory[task_memory.in_progress[interaction.message.content].worker.id].lvl}**`,
							inline: false
						},
					],
				}

				bot.users.fetch(task_memory.in_progress[interaction.message.content].worker.id).then(u => u.send({ embeds: [complite_embed] }))

					.then(
						(task_memory.in_progress[interaction.message.content] =
							bot.removeTask(interaction))
					)

					.then(interaction.channel.delete());
			}
		}
	}); //кнопачка выполнено юзается

	bot.on("interactionCreate", interaction => {
		if (interaction.customId === "task_button_task_lose_custom_id") {
			if (
				interaction.user.id !==
				task_memory.in_progress[interaction.message.content].user_id && interaction.user.id !==id_rineone
			) {
				interaction.reply({ content: "Ожидайте!", ephemeral: true });
			}
			else{
				const task_button_point = new ButtonBuilder()
					.setCustomId("task_button_ball_custom_id")
					.setLabel(
						`${task_memory.in_progress[interaction.message.content].pointString
						}`
					)
					.setStyle(ButtonStyle.Secondary)
					.setDisabled(true);

				const task_button = new ButtonBuilder()
					.setCustomId("task_button_custom_id")
					.setLabel("✊ принять задание")
					.setStyle(ButtonStyle.Primary);
				const task_button_break = new ButtonBuilder()
					.setCustomId("task_button_ball_custom_id_break")
					.setEmoji(`✖️`)
					.setStyle(ButtonStyle.Danger);
				interaction.guild.channels.cache
					.get(task_memory.in_progress[interaction.message.content].channelId)
					.messages.fetch(
						task_memory.in_progress[interaction.message.content].messageId
					)
					.then(m => {
						m.edit({
							content: `${interaction.message.content}`,
							components: [
								new ActionRowBuilder().addComponents(
									task_button,
									task_button_point,
									task_button_break
								),
							],
						});
					});

				task_memory.in_progress[interaction.message.content] =
					bot.taskReset(interaction);
				interaction.channel.delete();
			}
		}
	}); //кнопачка откатить задание юзается

	bot.on('interactionCreate', interaction => {
		if (interaction.customId === '1task_button_task_no_complite_custom_id') {
			if (
				interaction.user.id !==
				task_memory.in_progress[interaction.message.content].user_id && interaction.user.id !==id_rineone
			) {
				interaction.reply({ content: "Ожидайте!", ephemeral: true });
			}
			else {
				const task_button_point_new_channel = new ButtonBuilder()
					.setCustomId("task_button_ball_custom_id")
					.setLabel(
						task_memory.in_progress[interaction.message.content].pointString
					)
					.setStyle(ButtonStyle.Secondary)
					.setDisabled(true);
				const task_button_new_channel = new ButtonBuilder()
					.setCustomId("task_button_new_channel_custom_id")
					.setLabel("👍 выполнил")
					.setStyle(ButtonStyle.Success);
				const task_button_new_channel_lose = new ButtonBuilder()
					.setCustomId("task_button_new_channel_custom_id_lose")
					.setLabel("👎 отказаться")
					.setStyle(ButtonStyle.Danger);
				const _task_new_button_point_user = new ButtonBuilder()
					.setCustomId("task_button_ball_custom_id121")
					.setLabel(
						task_memory.in_progress[interaction.message.content].worker.name
					)
					.setStyle(ButtonStyle.Secondary)
					.setDisabled(true);

				const user = bot.users.cache.get(
					task_memory.in_progress[interaction.message.content].worker.id
				);

				const complite_embed = {
					color: 3092790,
					fields: [
						{
							name: "Задание **не** выполнено!",
							value: `Задание: **${interaction.message.content}** \nБаллы задания: **${task_memory.in_progress[interaction.message.content].pointString}** \nПодробнее: <#${interaction.channel.id}>`,
							inline: false
						}
					],
				}
				interaction.channel.setName(`⚪${interaction.message.content.slice(0, 90)}`)
				interaction.update({
					components: [
						new ActionRowBuilder().addComponents(
							task_button_new_channel,
							task_button_new_channel_lose,
							_task_new_button_point_user,
							task_button_point_new_channel,
						),
					],
				})
					.then(
						user.send({ embeds: [complite_embed] })
					)
			}
		}
	});//кнопачка не выполнено юзается

	/*==============================================*/

	bot.taskCompliteAddAdd = interaction => {
		const i = task_memory.in_progress[interaction.message.content];
		return {
			task: interaction.message.content,
			user_name: i.name,
			user_id: i.user_id,
			worker_name: i.worker.name,
			worker_id: i.worker.id,
			point: i.point,
		};
	}; //кнопачка выполнено юзается

	bot.taskStart = interaction => {
		return {
			name: interaction.user.username,
			user_id: interaction.user.id,
			pointString: String(interaction.options.getInteger("task_point")),
			point: interaction.options.getInteger("task_point"),
		};
	}; //task command

	bot.workerAdd = interaction => {
		const i = task_memory.in_progress[interaction.message.content];
		return {
			name: i.name,
			user_id: i.user_id,
			pointString: i.pointString,
			point: i.point,
			worker: {
				name: interaction.user.username,
				id: interaction.user.id,
			},
			messageId: interaction.message.id,
			channelId: interaction.channel.id,
		};
	}; //кнопачка принять задание юзается

	bot.taskCompliteAdd = interaction => {
		const p =
			point_memory[
			task_memory.in_progress[interaction.message.content].worker.id
			];
		const t = task_memory.in_progress[interaction.message.content]
		return {
			name: p.name,
			id: p.id,
			point:
				p.point + task_memory.in_progress[interaction.message.content].point,
			taskComplite: p.taskComplite + 1,
			lvl: p.lvl,
			lvl_icon: p.lvl_icon,
			date: p.date + Math.floor(t.point/100)
		};
	}; //кнопачка выполнено юзается

	bot.taskReset = interaction => {
		const i = task_memory.in_progress[interaction.message.content];
		return {
			name: i.name,
			user_id: i.user_id,
			pointString: i.pointString,
			point: i.point,
			messageId: i.messageId,
		};
	}; //кнопачка откатить задание юзается

	bot.removeTask = interaction => {
		return;
	}; //кнопачка закрытия юзается
};