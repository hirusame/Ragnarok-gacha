require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.MessageContent,
  ]
});

const commonRoles = ['Human', 'Elf', 'Goblin', 'Fishman', 'Dwarf'];
const rareRoles = ['Siren', 'Giant', 'Orc', 'Fairy'];

client.once('ready', () => {
  console.log(`✅ Bot siap sebagai ${client.user.tag}`);
});

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;
  if (message.channel.id !== process.env.CHANNEL_ID) return;
  if (message.content.toLowerCase() !== 'gacha') return;

  const rarity = Math.random() < 0.7 ? 'common' : 'rare';
  const roleList = rarity === 'common' ? commonRoles : rareRoles;
  const roleName = roleList[Math.floor(Math.random() * roleList.length)];
  const role = message.guild.roles.cache.find(r => r.name === roleName);

  if (!role) {
    return message.reply(`⚠️ Role **${roleName}** belum dibuat di server.`);
  }

  try {
    await message.member.roles.add(role);
    message.reply(`🎉 Kamu mendapatkan **${roleName}** (${rarity.toUpperCase()})!`);
  } catch (err) {
    console.error(err);
    message.reply('❌ Gagal kasih role, cek permission bot.');
  }
});

client.login(process.env.TOKEN);