const Discord = require('discord.js');
const client = new Discord.Client();
const { prefix, token, name, type, audio1 } = require('./config.json');

client.once('ready', () => {
    console.log(`Ready! ${client.user.tag}`);
    client.user.setActivity(name, {type: type});
});

client.on('message', msg => {
    // Это выводит сообщение в канале.
    console.log(`[${msg.guild.name}] - ${msg.channel.name} - ${msg.author.username}: ${msg.content}`);
    if (msg.content.startsWith(`${prefix}ping`)) {
        msg.channel.send('Pong');
    } else if (msg.content === `${prefix}server`) {
        msg.channel.send(`Название этого сервера: ${msg.guild.name}\nАватарка: ${msg.guild.iconURL()}`);
    };
});

client.on('message', msg =>{
    if (msg.author.bot || !msg.content.startsWith(prefix)) return;
    const args = msg.content.slice(prefix.length).split(/ +/);
    const cmd = args.shift().toLowerCase();

    if (cmd === 'clear') {
        if (!msg.member.hasPermission('MANAGE_MESSAGES')) return msg.channel.send("У вас недостаточно прав.")
        if (!args[0]) return msg.channel.send('Укажите колличество сообщений.')
        var num = parseInt(args[0], 10)
        if (isNaN(num)) return msg.channel.send('Циферками пиши, дэбил')
        if (num >= 100) return msg.channel.send('Уронить меня хотел? Быдло! Я могу удалять только до 100 сообщений!')
        if (num < 1) return msg.channel.send('Введи больше нуля.')
        try { 
            msg.channel.bulkDelete(num + 1); 
        } catch(e) {
            msg.channel.send("ERROR")
            console.log(e)
        };
    }
})

client.on('message', msg => {
    if (msg.content.startsWith(`${prefix}user`)) {
        const user = msg.mentions.users.first() || msg.author;
        const avatarEmbed = new Discord.MessageEmbed()
        .setTitle(`${user.username}#${user.discriminator}`)
        .setAuthor(`Данные юзера:`)
        .setDescription('Аватарка ниже:')
        .setImage(user.avatarURL({format: 'png', size: 4096, dynamic: true}))
        .setColor('#fff00');
        msg.channel.send({embed: avatarEmbed});
    };
})

client.on('message', msg => {
    if (msg.content.startsWith(`${prefix}help`)) {
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
    }
});

client.on('message', async msg => {
    if (msg.content.startsWith(`${prefix}voice`)) {
        const con = await msg.member.voice.channel.join();
        con.play(audio1);
    } else if (msg.content.startsWith(`${prefix}stop`)) {
        msg.guild.me.voice.channel.leave();
    };
});

client.login(token);
