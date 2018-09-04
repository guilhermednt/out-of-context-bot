var config = {
  telegram: {
    token: process.env.TELEGRAM_TOKEN,
    owner_username: process.env.TELEGRAM_OWNER_USERNAME,
    allowed_chat_ids: process.env.TELEGRAM_CHAT_IDS.split(',')
  },
  twitter: {
    credentials: {
      consumer_key: process.env.TWITTER_CONSUMER_KEY,
      consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
      access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
      access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
    }
  }
}
  
module.exports = config
