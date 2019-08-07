const Discord = require('discord.js');
const bot = new Discord.Client();

const token = 'NjA4MDc2NjI0OTU2NDg5NzQ4.XUnluw.Xb4RyZxz1pJLyhvh207GPlKcRWM';

const PREFIX = '!';

bot.on('ready', () => {
  console.log('This bot is online!');
})

bot.on('guildMemberAdd', member => {

  const channel = member.guild.channels.find(channel => channel.name === 'welcome');
  if (!channel) {
    return;
  }

  channel.send(`Welcome to our server, ${member}!`);

});

bot.on('message', message => {
  let args = message.content.substring(PREFIX.length).split(" ");
  switch(args[0]) {
    case 'whoami':
      const embed = new Discord.RichEmbed()
      .setTitle('User Information')
      .addField('User Name', message.author.username)
      .addField('Current Server', message.guild.name)
      .setFooter('How do you forget who you are...?', message.author.avatarURL)
      .setColor(0x1d5bfe)
      .setThumbnail(message.author.avatarURL);
      message.channel.send(embed);
      break;
    case 'censor':
      if (!args[1]) {
        return message.reply("Error! Please define second arg");
      }
      message.channel.bulkDelete(args[1]);
      break;
  }
})

bot.login(token);