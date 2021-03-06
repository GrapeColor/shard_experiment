const Discord = require('discord.js');
const bot = new Discord.Client({
  shards: Number(process.argv[2]), shardCount: Number(process.argv[3]),
  ws: { intents: Discord.Intents.NON_PRIVILEGED }
});

bot.on('shardReady', () => {
  const opts = bot.options;
  bot.user.setActivity(`${Number(opts.shards) + 1} / ${opts.shardCount} shards`, { shardID: opts.shards })
    .catch(console.error);
});

bot.on('message', message => {
  if (RegExp(`^<@${bot.user.id}>`).test(message)) {
    message.channel.send(`No. ${Number(bot.options.shards) + 1} shard received a mention.`)
      .catch(console.error);
  }
});

bot.login(process.env.SHARD_EXPERIMENT_TOKEN)
  .catch(console.error);
