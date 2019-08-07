const Discord = require('discord.js');
const Config = require('config');

const bot = new Discord.Client();

const token = Config.get('discord.token');

const PREFIX = '!';

bot.on('ready', () => {
  console.log('This bot is online!');
});

bot.on('guildMemberAdd', (member) => {
  const channel = member.guild.channels.find(
      (channel) => channel.name === 'welcome');
  if (!channel) {
    return;
  }

  channel.send(`Welcome to our server, ${member}!`);
});

bot.on('message', (message) => {
  const args = message.content.substring(PREFIX.length).split(' ');
  switch (args[0]) {
    case 'whoami':
      const embed = new Discord.RichEmbed()
          .setTitle('User Information')
          .addField('User Name', message.author.username)
          .addField('Current Server', message.guild.name)
          .setFooter('How do you forget who you are...?',
              message.author.avatarURL)
          .setColor(0x1d5bfe)
          .setThumbnail(message.author.avatarURL);
      message.channel.send(embed);
      break;
    case 'censor':
      if (!args[1]) {
        return message.reply('Error! Please define second arg');
      }
      message.channel.bulkDelete(args[1]);
      break;
  }
});

bot.login(token);
