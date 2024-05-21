const { Telegraf, Markup } = require("telegraf");
const { keyboard } = require("telegraf/markup");

const bot = new Telegraf("7155277062:AAGvRIw48a556IzWEk42LCKv3u7bmhOSLE8");

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
  { id: 6426449565, premium: false, balance: 0 },
  { id: 840223100, premium: false, balance: 0 },
  { id: 826817926, premium: false, balance: 0 },
  { id: 6337349498, premium: false, balance: 0 },
  { id: 584105386, premium: false, balance: 0 },
  { id: 1798285348, premium: false, balance: 0 },
  { id: 6272928150, premium: false, balance: 0 },
  { id: 522460382, premium: false, balance: 0 },
  { id: 5139593530, premium: false, balance: 0 },
  { id: 6672865814, premium: false, balance: 0 },
  { id: 5641087323, premium: false, balance: 0 },
  { id: 5866952061, premium: false, balance: 0 },
  { id: 705337343, premium: false, balance: 0 },
  { id: 6501975909, premium: false, balance: 0 },
  { id: 1763307809, premium: false, balance: 0 },
  { id: 10317808, premium: false, balance: 0 },
  { id: 604326284, premium: false, balance: 0 },
  { id: 1809151911, premium: false, balance: 0 },
  { id: 6477038451, premium: false, balance: 0 },
  { id: 5907817074, premium: false, balance: 0 },
  { id: 629631609, premium: false, balance: 0 },
  { id: 5409007786, premium: false, balance: 0 },
  { id: 6154867116, premium: false, balance: 0 },
  { id: 775402973, premium: false, balance: 0 },
  { id: 5223749586, premium: false, balance: 0 },
  { id: 726451578, premium: false, balance: 0 },
  { id: 6329749260, premium: false, balance: 0 },
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
      referralCounts[userId] = u.balance;
    }
  });

  if (referralId && typeof referralCounts[referralId] == "number" && !userOr) {
    referralCounts[referralId]++;
    users.forEach((i) => {
      console.log(ctx.chat.id, i.id);
      if (i.id == referralId) {
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
  if (referralId && typeof referralCounts[referralId] !== "number") {
    ctx.telegram.sendMessage(
      referralId,
      `Your referrals are not being counted, click /referral`
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
  users.forEach((u) => {
    if (u.id == ctx.chat.id) {
      referralCounts[ctx.chat.id] = u.balance;
    }
  });
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
        `${msg.chat.id} , balance ${referralCounts[msg.chat.id]}`,
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

    bot.hears("Send message to user", (contex) => {
      let id = null;
      let premium = null;
      let balance = null;

      bot.hears("Set premium 💎", (msg) => {
        users.forEach((i) => {
          if (i.id == id) {
            i.premium = true;
          }
        });
        msg.telegram.sendMessage(
          id,
          `Payment has been confirmed ✅
          You have purchased the premium version 😍🎊`
        );

        msg.telegram.sendMessage(841886966, "User got Premium succesfully ✅");
      });

      bot.hears("Unset premium 💎", (msg) => {
        users.forEach((i) => {
          if (i.id == id) {
            i.premium = false;
          }
        });
        msg.telegram.sendMessage(
          id,
          `You have disabled the premium version 😢`,
          {
            reply_markup: {
              inline_keyboard: [
                [{ text: "Buy Premium 💎", callback_data: "buy-btn" }],
              ],
            },
          }
        );

        msg.telegram.sendMessage(
          841886966,
          "The premium version has been removed from the user ✅"
        );
      });

      contex.telegram.sendMessage(contex.chat.id, "Enter id: ");

      bot.on("message", async (msg) => {
        await users.forEach((u) => {
          if (u.id == msg.message.text) {
            id = u.id;
            premium = u.premium;
            balance = u.balance;

            contex.telegram.sendMessage(
              contex.chat.id,
              `
          id: <b> ${id}</b>
  premium: <b> ${premium ? `Bor ✅` : `Yo'q ❌`}</b>
  balance: <b> ${balance}</b>
          `,
              {
                parse_mode: "HTML",
                reply_markup: {
                  remove_keyboard: true,
                  resize_keyboard: true,
                  keyboard: [
                    [{ text: "Set premium 💎" }],
                    [{ text: "Unset premium 💎" }],
                  ],
                },
              }
            );
          }
        });
      });
    });

    bot.hears("All users", async (contex) => {
      let txt = "";
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
  let balance = 0;
  users.forEach((i) => {
    if (i.id == userId) {
      balance = i.balance;
    }
  });
  console.log(userIds[userId]);
  if (userIds[userId]) {
    userIds[userId] = true;
    referralCounts[userId] = balance;
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
