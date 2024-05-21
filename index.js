const { Telegraf, Markup } = require("telegraf");
const { keyboard } = require("telegraf/markup");

const bot = new Telegraf("6961359824:AAG4Hd2GqYNiogk5i6U5kmrJlft1Hlpab9A");

const users = [
  { id: 841886966, premium: false, balance: 0 },
  { id: 5550269002, premium: true, balance: 0 },
  { id: 993003604, premium: false, balance: 0 },
  { id: 6791034718, premium: false, balance: 0 },
  { id: 6818657725, premium: false, balance: 0 },
  { id: 1954208300, premium: false, balance: 0 },
  { id: 746252917, premium: false, balance: 0 },
  { id: 2028047530, premium: false, balance: 0 },
  { id: 7067645199, premium: false, balance: 0 },
  { id: 6253141487, premium: false, balance: 0 },
  { id: 778806941, premium: false, balance: 0 },
  { id: 1332520178, premium: false, balance: 0 },
  { id: 850285653, premium: false, balance: 0 },
  { id: 737316570, premium: false, balance: 0 },
  { id: 700632653, premium: false, balance: 0 },
  { id: 822934520, premium: false, balance: 0 },
  { id: 7026932649, premium: false, balance: 0 },
  { id: 566420798, premium: false, balance: 0 },
  { id: 6580508619, premium: false, balance: 0 },
];

const referralCounts = {}; // For storing referral counts
const userIds = {}; // For storing user IDs

bot.start(async (ctx) => {
  const userId = ctx.from.id;
  const referralId = ctx.payload;
  let userOr = false;
  users.forEach((u) => {
    if (u.id == userId) {
      userOr = true;
    }
  });

  if (referralId && typeof referralCounts[referralId] == "number" && !userOr) {
    console.log("linked");
    referralCounts[referralId]++;
    users.forEach((i) => {
      if (i.id == ctx.chat.id) {
        i.balance++;
      }
    });
    ctx.reply(`Thanks for joining via referral! 🎉`);
    bot.telegram.sendMessage(
      referralId,
      `You've got a new referral! Total referrals: ${referralCounts[referralId]}
      
      ${
        ctx.chat.username ? `@${ctx.chat.username}` : `'${ctx.chat.first_name}'`
      } is joined with your referral link

      `
    );
  }

  userIds[userId] = true;

  const isUser = users.find((user) => user.id == ctx.chat.id);
  if (!isUser) {
    users.push({ id: ctx.chat.id, premium: false, balance: 0 });
  }
  await ctx.telegram.sendPhoto(
    ctx.chat.id,
    { source: "fashion.png" },
    {
      caption: `<b>Hey, @${
        ctx.chat.username ? ctx.chat.username : ctx.chat.first_name
      }! Welcome to CryptoApps!</b>

        In this bot you can use all the applications you need to work with cryptocurrency.

        Use /referral to get your referral link.

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
      caption: `<b>Hey, @${
        ctx.chat.username ? ctx.chat.username : ctx.chat.first_name
      }! Welcome to CryptoApps!</b>

      In this bot you can use all the applications you need to work with cryptocurrency.

      Use /referral to get your referral link.

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
      `Your current version is Premium
      You have many features.
      
      Your friends : <b>${
        referralCounts[ctx.chat.id] ? referralCounts[ctx.chat.id] : "0"
      }</b>

      Your current balance:  <b>${
        referralCounts[ctx.chat.id] ? referralCounts[ctx.chat.id] : "0"
      } USDT 💰</b>
      `,
      { parse_mode: "HTML" }
    );
  } else {
    ctx.telegram.sendMessage(
      ctx.chat.id,
      `You don't have premium version , you can buy it 👇
      
      Your friends : <b>${
        referralCounts[ctx.chat.id] ? referralCounts[ctx.chat.id] : "0"
      }</b>

      Your current balance:  <b>${
        referralCounts[ctx.chat.id] ? referralCounts[ctx.chat.id] : "0"
      } USDT 💰</b>

      You can use this money to buy Premium version 💎

      Get your referral link: /referral
      `,
      {
        parse_mode: "HTML",
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

      msg.telegram.sendMessage(
        841886966,
        `${chatId} , balance ${referralCounts[chatId]}`,
        {
          reply_markup: {
            inline_keyboard: [
              [{ text: "Give premium", callback_data: "give-premium" }],
            ],
          },
        }
      );
    });
  }
});

bot.hears("/admin", (ctx) => {
  const chatId = ctx.chat.id;
  if (chatId == "841886966") {
    ctx.telegram.sendMessage(841886966, "You're Admin in the bot 🙎‍♂️", {
      reply_markup: {
        keyboard: [
          [{ text: "Give premium" }],
          [{ text: "All users" }],
          [{ text: "Send message to all users" }],
          [{ text: "Send message to user" }],
        ],
        resize_keyboard: true,
      },
    });

    bot.hears("Send message to all users", (contex) => {
      contex.telegram.sendMessage(841886966, "Enter message: ");
      bot.on("message", (msg) => {
        users.forEach((i) => {
          msg.telegram.sendMessage(i.id, msg.message.text, {
            reply_markup: {
              inline_keyboard: [
                [
                  {
                    text: "Join Channel",
                    url: "https://t.me/CryptoApps_announcement",
                  },
                ],
              ],
            },
          });
        });
      });
    });

    bot.hears("Give premium", async (prm) => {
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
        txt += `${i.premium}, `;
        txt += "balance:";
        txt += `${i.balance} }, `;
      });
      contex.telegram.sendMessage(841886966, txt);
    });
  }
});

// Function to generate referral link
const generateReferralLink = (userId) =>
  `https://t.me/CryptoAppsbot?start=${userId}`;

bot.command("referral", (ctx) => {
  const userId = ctx.from.id;
  console.log(userIds[userId]);
  if (userIds[userId]) {
    userIds[userId] = true;
    referralCounts[userId] = 0;
    console.log(referralCounts);
  }

  const referralLink = generateReferralLink(userId);
  console.log(referralCounts);
  ctx.reply(
    `<b>This bot allows you to work crypto without leaving Telegram. Click 👇</b>

   ${referralLink} 
   
   `,
    { parse_mode: "HTML" }
  );
});

bot.launch();
