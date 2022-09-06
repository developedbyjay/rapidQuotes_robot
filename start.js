require("dotenv").config();
const { Telegraf } = require("telegraf");
const { startCommand, keyboard, menuCommand } = require("./actions/index");
const action = require("./controller/mainfunction");
const { flatten } = require("array-flatten");
const bot = new Telegraf(process.env.TOKEN);


const message = async (ctx) => {
  const text = `
Hello <b>${ctx.chat.first_name}🏆</b>

-- Kindly Join the channel for fast and rapid sharing of information about changes in the bot
-- Then, click the menu button
-- click run and enjoy the features of the bot.

cheers💃`;

  const msg = await ctx.telegram.sendMessage(ctx.chat.id,`<pre>${text}</pre>`, {
    parse_mode: "Html",
    reply_markup: {
      inline_keyboard: [
        [{ text: "Channel", url: `t.me/${process.env.CHANNEL_LINK}` }],
      ],
    },
  });
  await setTimeout(async ()=> {
    await ctx.deleteMessage(msg.message_id)
  },65000)
};

bot.use(async (ctx,next) => {
    try {
      if (ctx.chat.type === "channel") return;
      const user = await ctx.telegram.getChatMember(
        process.env.CHANNEL,
        ctx.chat.id
      );
      if (user.status === "left") {
        message(ctx);
        return;
      }
      next();
    } catch (e) {
      console.log(e)
      ctx.reply(`Error, Connecting to server`);
    }
})

// Actions... Commands
bot.command("start", (ctx) => startCommand(ctx));
bot.action("menu", (ctx) => menuCommand(ctx));

// Flatten the Keyboard Array
const newKeyboard = flatten(keyboard);
newKeyboard.forEach((x) => {
  if (x.url) return;
  bot.action(x.callback_data, (ctx) => action(ctx));
});

// Start The Bot
bot.launch();

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));


