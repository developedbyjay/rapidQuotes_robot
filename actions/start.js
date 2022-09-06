const startCommand = (ctx) =>{
        const name = ([ctx.from.first_name,ctx.from.last_name].filter(Boolean).join(' ') || 'Anonymous')
        ctx.telegram.sendMessage(
          ctx.chat.id,
          `Welcome <b>${name}🏆</b>, How are you doing today. 
Awesome right ♥️..

Glad to have you here.🥳🥳
kindly Read the following instructions!

-- <b>To access the Bot features, click on Menu ..</b>
-- <b>To report errors or complains to the Developer, click the specified button..</b>
-- <b>You can support us by sharing our Bot with your friends on WhatsApp </b>

`,
          {
            parse_mode:"Html",
            reply_markup: {
              inline_keyboard: [
                [
                  {
                    text: "🚪 Menu 🚪",
                    callback_data: "menu",
                  },
                ],
                [
                  {
                    text: "🌸 Share 🌺‍",
                    url: "https://api.whatsapp.com/send?text=Hello Friends, Join me on RapidQuotes for daily Quotes, Inspirations and Motivations. Click  t.me/rapidQuotes_bot ",
                  },
                ],
                [
                  {
                    text: "👨‍ Contact the Developer 👨‍",
                    url: "https://twitter.com/develop_ed?s=09",
                  },
                ],
              ],
            },
          }
        );
}

module.exports = startCommand;
