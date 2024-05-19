const { Telegraf, Markup } = require("telegraf");
const { keyboard } = require("telegraf/markup");

const bot = new Telegraf("7192749812:AAHN6G9iK0Aliua_oTXrxg82OPhfulRZ01o");

const users = [{ id: 1, premium: true }];

bot.hears("/start", async (ctx) => {
  const isUser = users.find((user) => user.id == ctx.chat.id);
  if (!isUser) {
    users.push({ id: ctx.chat.id, premium: false });
  }
  await ctx.telegram.sendPhoto(
    ctx.chat.id,
    { source: "fashion.png" },
    {
      caption: `<b>Hey, @${ctx.chat.username}! Welcome to CryptoApps!</b>
        
        In this bot you can use all the applications you need to work with cryptocurrency.
        
        Choose the section you need 👇 `,
      parse_mode: "HTML",
      reply_markup: {
        keyboard: [[{ text: "Crypto Apps 🎮" }], [{ text: "Profile 🙎‍♂️" }]],
        resize_keyboard: true,
      },
    }
  );
});

bot.hears("Back Home 🏡", async (ctx) => {
  await ctx.telegram.sendPhoto(
    ctx.chat.id,
    { source: "fashion.png" },
    {
      caption: `<b>Hey, @${ctx.chat.username}! Welcome to CryptoApps!</b>
      
      In this bot you can use all the applications you need to work with cryptocurrency.
      
      Choose the section you need 👇 `,
      parse_mode: "HTML",
      reply_markup: {
        keyboard: [[{ text: "Crypto Apps 🎮" }], [{ text: "Profile 🙎‍♂️" }]],
        resize_keyboard: true,
      },
    }
  );
});

bot.hears("Crypto Apps 🎮", async (ctx) => {
  await ctx.telegram.sendMessage(ctx.chat.id, "Choose the App you need 👇", {
    reply_markup: {
      keyboard: [
        [
          {
            text: "Tradingview",
            web_app: {
              url: "https://ru.tradingview.com/",
            },
          },
        ],
        [
          {
            text: "Crypto Bubbles",
            web_app: {
              url: "https://cryptobubbles.net/",
            },
          },
        ],
        [
          {
            text: "Coinmarketcap",
            web_app: {
              url: "https://coinmarketcap.com/",
            },
          },
        ],
        [
          {
            text: "Mexc",
            web_app: {
              url: "https://www.mexc.com/register?inviteCode=12Djrz",
            },
          },
        ],
        [
          {
            text: "Binance",
            web_app: {
              url: "https://accounts.binance.com/register?ref=341767340",
            },
          },
        ],
        [
          {
            text: "Back Home 🏡",
          },
        ],
      ],
      resize_keyboard: true,
    },
  });
});

bot.hears("Profile 🙎‍♂️", async (ctx) => {
  const isUser = users.find((user) => user.id == ctx.chat.id);
  console.log(users);
  if (isUser.premium == true) {
    ctx.telegram.sendMessage(
      ctx.chat.id,
      `Your current version ${isUser.premium}`
    );
  } else {
    ctx.telegram.sendMessage(
      ctx.chat.id,
      "You don't have premium version , you can buy it 👇",
      {
        reply_markup: {
          remove_keyboard: true,
          inline_keyboard: [
            [{ text: "Buy Premium 💎", callback_data: "buy-btn" }],
          ],
        },
      }
    );
  }
});

bot.on("callback_query", (query) => {
  const chatId = query.chat.id;
  if (query.callbackQuery.data === "buy-btn") {
    query.telegram.sendMessage(
      chatId,
      ` 
      Premium price is 20 USDT for lifetime.

      You can get many additional features and airdrops in the Premium version.

      <b>Trc20 address</b> : <em> TUY4oQTkoPKrwJ1nknAXNbRsYTEFcBzVZa</em>
       
<b>Send a picture of the check after payment 👇</b>
       `,
      { parse_mode: "HTML" }
    );
    bot.on("photo", (msg) => {
      console.log(msg.message.photo);
      msg.telegram.sendMessage(
        chatId,
        "Your message has been successfully sent to admin. We will check and give you the premium version soon ✅"
      );
      msg.telegram.forwardMessage(
        841886966,
        msg.chat.id,
        msg.message.message_id
      );

      msg.telegram.sendMessage(841886966, chatId, {
        reply_markup: {
          inline_keyboard: [
            [{ text: "Give premium", callback_data: "give-premium" }],
          ],
        },
      });
    });
  }
});

bot.hears("/admin", (ctx) => {
  const chatId = ctx.chat.id;
  if (chatId == "841886966") {
    ctx.telegram.sendMessage(841886966, "You're Admin", {
      reply_markup: {
        keyboard: [[{ text: "Give premium" }], [{ text: "All users" }]],
      },
    });
    bot.hears("Give premium", async (prm) => {
      console.log("salom");
      await prm.telegram.sendMessage(chatId, "Enter id :");
      await bot.on("message", (msg) => {
        users.forEach((i) => {
          if (i.id == msg.message.text) {
            i.premium = true;
          }
        });
        msg.telegram.sendMessage(
          msg.message.text,
          `Payment has been confirmed ✅
          You have purchased the premium version 😍🎊`
        );
        msg.telegram.sendMessage(841886966, "User got Premium succesfully ✅");
      });
    });
    bot.hears("All users", async (contex) => {
      let txt = "all users: ";
      await users.forEach((i) => {
        txt += "{id:";
        txt += `${i.id} ,`;
        txt += "premium:";
        txt += `${i.premium} }`;
      });
      contex.telegram.sendMessage(841886966, txt);
    });
  }
});

bot.launch();
