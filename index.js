const Discord = require('discord.js');
const client = new Discord.Client();
const { prefix, token, type, audio1, audio2 } = require('./config.json');
const name = 'ENA';

client.once('ready', () => {
    console.log(`Ready! ${client.user.tag}`);
    client.user.setActivity(name, {type: type});
});

client.on('message', msg => {
    // Это выводит сообщение в канале.
    console.log(`[${msg.guild.name}] - ${msg.channel.name} - ${msg.author.username}: ${msg.content}`);
});

client.on('message', async msg =>{
    if (msg.author.bot || !msg.content.startsWith(prefix)) return;
    const args = msg.content.slice(prefix.length).split(/ +/);
    const cmd = args.shift().toLowerCase();

    async function playmus(a1) {
    const playcon = await msg.member.voice.channel.join();
    playcon.play(a1);
    };

    function nonono() {
        msg.channel.send('У вас нет прав на эту команду');
    };

    if (cmd === 'clear') {
        if (!msg.member.hasPermission('MANAGE_MESSAGES')) return nonono();
        if (!args[0]) return msg.channel.send('Укажите колличество сообщений.');
        var num = parseInt(args[0], 10);
        if (isNaN(num)) return msg.channel.send('Циферками пиши, дэбил');
        if (num >= 100) return msg.channel.send('Уронить меня хотел? Быдло! Я могу удалять только до 100 сообщений!');
        if (num < 1) return msg.channel.send('Введи больше нуля.')
        try { 
            msg.channel.bulkDelete(num + 1); 
        } catch(e) {
            msg.channel.send("ERROR")
            console.log(e)
        };
    };
    if (cmd === 'voice1') {
        playmus(audio1);
    };
    if (cmd === 'voice2') {
        playmus(audio2);
    };
    if (cmd === 'stop') {
        msg.guild.me.voice.channel.leave();
    };
    if (cmd === 'changegame') {
        client.user.setActivity(name, {type: type});
    };
    if (cmd === 'destroy') {
        if (!msg.member.hasPermission('ADMINISTRATOR')) return nonono();
        msg.channel.send('Выключение...').then(() =>{
            client.destroy();
        });
    };
    if (cmd === 'echo') {
        const cmd1 = `${prefix}${cmd}`;
        msg.channel.send(`${msg.content.replace(cmd1, '')}`);
    };
    if (cmd === 'user') {
        const user = msg.mentions.users.first() || msg.author;
        const avatarEmbed = new Discord.MessageEmbed()
        .setTitle(`${user.username}#${user.discriminator}`)
        .setAuthor(`Данные юзера:`)
        .setDescription('Аватарка ниже:')
        .setImage(user.avatarURL({format: 'png', size: 4096, dynamic: true}))
        .setColor('#fff00');
        msg.channel.send({embed: avatarEmbed});
    };
    if (cmd === 'help') {
        const helpEmbed = {
            color: 0x0099ff,
            title: '~~помощь душевнобольным детям из ДНР~~',
            url: 'https://google.com/',
            author: {
                name: 'BillVLad#4499',
                icon_url: `https://cdn.discordapp.com/avatars/705336251233992705/227df8563f4e3058d79139505492bffe.png`,
                url: 'https://billvlad.github.io'
            },
            description: '*Что-то на арабском*',
            fields: [
                {
                    name: 'help',
                    value: 'Вы сейчас это видите',
                },
                {
                    name: 'play',
                    value: 'Начинает играть музыку (хуня какая-то)',
                    inline: true
                },
                {
                    name: 'stop',
                    value: 'Выгоняет араба на улицу',
                    inline: true
                },
            ],
            timestamp: new Date(),
        };
        msg.channel.send({ embed: helpEmbed });
    };
    if (cmd === 'server') {
        let desc = msg.guild.description;
        if (desc === null) { 
            desc = `Нету описания`;
        }
        const ServerEmbed = {
            color: 0x0000000,
            title: `Информация о сервере:`,
            author: {
                name: `Сервер: ${msg.guild.name}`,
                icon_url: `${msg.guild.iconURL({format: 'png', size: 256, dynamic: true})}`
            },
            fields: [
                {
                    name: `Описание:`,
                    value: desc,
                },
                {
                    name: `Регион:`,
                    value: msg.guild.region
                }
            ]
        };
        msg.channel.send({embed: ServerEmbed});
    };
})

client.login(token);
