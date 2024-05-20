const { Telegraf } = require("telegraf");

const bot = new Telegraf("7155277062:AAGvRIw48a556IzWEk42LCKv3u7bmhOSLE8");
const referralCounts = {}; // For storing referral counts
const userIds = {}; // For storing user IDs

// Function to generate referral link
const generateReferralLink = (userId) =>
  `https://t.me/CryptoApps_ebot?start=${userId}`;

bot.start((ctx) => {
  const referralId = ctx.payload;

  // Check if user joined via a referral link
  if (referralId && referralCounts[referralId]) {
    referralCounts[referralId]++;
    ctx.reply(`Thanks for joining via referral!`);
    bot.telegram.sendMessage(
      referralId,
      `You've got a new referral! Total referrals: ${referralCounts[referralId]}`
    );
  }

  const userId = ctx.from.id;
  userIds[userId] = true;

  ctx.reply(
    `Welcome, ${ctx.from.first_name}! Use /referral to get your referral link.`
  );
});

bot.command("referral", (ctx) => {
  const userId = ctx.from.id;
  if (!userIds[userId]) {
    userIds[userId] = true;
    referralCounts[userId] = 0;
  }

  const referralLink = generateReferralLink(userId);
  ctx.reply(`Here is your referral link: ${referralLink}`);
});

bot.launch();
