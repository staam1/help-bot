////coded by : rr#1000
///https://www.youtube.com/channel/UCAVB8JOSy_y3qoR7bIsiAYg?view_as=subscriber

const Discord = require('discord.js');
const express = require('express');
const fs = require('fs');
const client = new Discord.Client();


const prefix = '!' ///تعديل مهم للبريفكس

///https://www.youtube.com/channel/UCAVB8JOSy_y3qoR7bIsiAYg?view_as=subscriber

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
  console.log("> | Ra3d Suggestion Bot : YEs");
  console.log("> | Date :");
  console.log(`> | ${new Date()}`);
  console.log("> | Name :");
  console.log(`> ${client.user.username}`);
  client.user.setActivity(prefix + 'Help I Ra3d Suggestion Bot ', ({type: "WATCHING"})) //حط قيم الي تبيها
});
 
////coded by : rr#1000
///https://www.youtube.com/channel/UCAVB8JOSy_y3qoR7bIsiAYg?view_as=subscriber

const sug = JSON.parse(fs.readFileSync("./rasug.json", "utf8"));
var sugcool = new Set();
client.on('message', async message => {
    if (message.content.startsWith(prefix + 'sug')) {
        if (['set', 'blacklist add', 'blacklist add', 'blacklist list', 'on', 'off'].includes(message.content.split(" ")[1])) return null;
        if (!sug[message.guild.id] || !message.guild.channels.cache.get(sug[message.guild.id].channel)) return message.channel.send(`**:x: حدث خطا!
  اذا كنت من ادمنيه السيرفر برجاء كتابه الامر الاتي : \`${prefix}set-sug\`  لتحديد روم الاقتراحات**`);
        if (sug[message.guild.id].onoff == 'Off') return message.channel.send(`**This Command Has Been Disabled**!`);
        if (sugcool.has(message.author.id)) return message.channel.send(message.author.username + ',**برجاء الانتظار 5 دقائق بين كل اقتراح**!')
        if (!sug[message.guild.id]) sug[message.guild.id] = {};
        var args = message.content.split(" ").slice(1).join(" ");
        if (!args) return message.channel.send('**برجاء كتابه اقتراحك بعد الامر مباشره**!');
        var random = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        var ID = "";
        for (var y = 0; y < 8; y++) {
            ID += `${random.charAt(Math.floor(Math.random() * random.length))}`;
        };
        sugcool.add(message.author.id);
        setTimeout(() => {
            sugcool.delete(message.author.id);
        }, 5 * 60 * 1000);
        let embed = new Discord.MessageEmbed().setAuthor(`Username : ${message.author.tag}   ID: ${message.author.id}`)
         .setColor('#f06301')
         .setThumbnail(message.author.displayAvatarURL({dynamic : true}))
         .setDescription(args).setFooter(`Suggestion Code: ${ID}`).setTimestamp();
        let ch = message.guild.channels.cache.get(sug[message.guild.id].channel);
        message.channel.send(`**تم ارسال اقتراحك الى : ${ch}**`);
        ch.send(embed).then(M => {
            M.react('👍');
            M.react('👎')
            sug[message.guild.id + ID] = {
                ID: M.id,
                by: message.author.id,
                content: args
            }
            fs.writeFile("./rasug.json", JSON.stringify(sug), (err) => {
                if (err) console.error(err)
            });
            fs.writeFile("./rasug.json", JSON.stringify(sug), (err) => {
                if (err) console.error(err)
            });
        })
    }
  ////coded by : rr#1000
///https://www.youtube.com/channel/UCAVB8JOSy_y3qoR7bIsiAYg?view_as=subscriber

    if (message.content.startsWith(prefix + 'reply')) {
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send(`**ليس لديك صلاحيه "MANAGE_MESSAGES" !!**`)
        if (!sug[message.guild.id] || !message.guild.channels.cache.get(sug[message.guild.id].channel)) return message.channel.send(
            `**:x: حدث خطا!
            اذا كنت من ادمنيه السيرفر برجاء كتابه الامر الاتي : \`${prefix}set-sug\`  لتحديد روم الاقتراحات**`)
        var ID = message.content.split(" ")[1];
        if (!ID || !sug[message.guild.id + ID]) return message.channel.send('**لم اتمكن من العثور على الاقتراحات يحمل هذا ال id !**')
        let ch = message.guild.channels.cache.get(sug[message.guild.id].channel)
        let oMessage = sug[message.guild.id + ID].ID ? await ch.messages.fetch(sug[message.guild.id + ID].ID) : null;
        if (!oMessage) return message.channel.send('**لم اتمكن من العثور على الاقتراحات يحمل هذا ال id !**')
        let editt = message.content.split(" ")[2];
        if (!editt) return message.channel.send(`**برجاء كتابه الرد بعد الامر مباشره**`);
        message.channel.send(`**☑️ تم الرد على الاقتراح حامل هذا ال ID : \`${ID}\` !**`)
        let em = message.guild.members.cache.get(sug[message.guild.id + ID].by);
        em.send(new Discord.MessageEmbed().setAuthor(message.guild.name, message.guild.iconURL)
            .setThumbnail(message.guild.iconURL({dynamic : true}))
            .setColor('#00ff97').setDescription(`**شكرا للرد على الاقتراح   Server ID : (${message.guild.id}) | Suggestion ID : (${ID})**`).setTimestamp())
        oMessage.edit(new Discord.MessageEmbed().setAuthor(`New Suggestion By ${em.user.username}`, em.avatarURL)
            .addField('**Suggestion:**', sug[message.guild.id + ID].content).addField(`**${message.author.tag} Replied:**`, editt)
            .setFooter(`Suggestion Code: (${ID})`).setTimestamp().setColor('#9ef001'))

    }
})
////coded by : rr#1000
///https://www.youtube.com/channel/UCAVB8JOSy_y3qoR7bIsiAYg?view_as=subscriber

client.on('message', message => {
    if (message.content.startsWith(prefix + 'set-sug')) {
        if (!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send(`صلاحياتك لا تكفي لنحديد الروم يجيب ان يكون لديك صلاحيه **MANAGE_GUILD**`)
        let ch = message.mentions.channels.first() || message.guild.channels.cache.get(message.content.split(" ")[1]);
        if (!ch) return message.channel.send('لم اتمكن من العثور على هذا الروم برجاء المحاوله مره اخرى');
        sug[message.guild.id] = {
            onoff: 'On',
            channel: ch.id
        };
        fs.writeFile("./rasug.json", JSON.stringify(sug), (err) => {
            if (err) console.error(err)
        });
        message.channel.send(`**جميع الاقتراحات سيتم ارسالها للروم الاتي : ${ch}**`)
    }
})
////coded by : rr#1000
///https://www.youtube.com/channel/UCAVB8JOSy_y3qoR7bIsiAYg?view_as=subscriber


client.on("message", message => {
  if (message.content == prefix + "help") {
    let help = new Discord.MessageEmbed()
      .setColor("0x5016f3")
      .setThumbnail(message.author.displayAvatarURL({dynamic : true}))
.setAuthor(client.user.username, client.user.displayAvatarURL({ dynamic: true}))
      .setDescription(`
      \`${prefix}sug :\` ** لنشر اقتراح معين **
      \`${prefix}set-sug :\` **لاختيار روم الاقتراحات **
      \`${prefix}reply :\` **للرد على اقتراح معين**
      \`${prefix}ping :\` **لعرض بنق البوت **

      رابط الشرح : https://www.youtube.com/channel/UCAVB8JOSy_y3qoR7bIsiAYg
      رابط السيرفر : https://discord.gg/XMC8vTb
            `);
    message.channel.send(help);
  }
});
////coded by : rr#1000
///https://www.youtube.com/channel/UCAVB8JOSy_y3qoR7bIsiAYg?view_as=subscriber


client.on("message",message => {
  if(message.content.toLowerCase().startsWith(prefix + "ping".toLowerCase())){
    let start = Date.now();
    message.channel.send(`**My Ping Is :** \`${Date.now() - message.createdTimestamp} ms\``);
    
  }
})


////coded by : rr#1000
///https://www.youtube.com/channel/UCAVB8JOSy_y3qoR7bIsiAYg?view_as=subscriber


client.login(process.env.token);