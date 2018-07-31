const config = require('./config')
const Twitter = require('twitter')
const Telegraf = require('telegraf')

const twitter = new Twitter(config.twitter.credentials)

console.log(`Initializing Telegram bot...`)
const bot = new Telegraf(config.telegram.token)

const postTweet = (ctx, msg) => {
    const from = ctx.message.from.username
    console.log(`Tweet from ${from}: ${msg}`)

    twitter.post('statuses/update', {status: msg})
        .then(tweet => {
            const uri = `https://twitter.com/${tweet.user.screen_name}/status/${tweet.id_str}`
            ctx.replyWithHTML(`<a href="${uri}">Tweet posted</a> <pre>${msg}</pre>`)
        })
        .catch(err => {
            ctx.replyWithHTML(`Error while tweeting: <pre>${err}</pre>`)
            console.error(err)
        })
}

bot.command('tweet', ctx => {
    if (undefined === ctx.message || undefined === ctx.message.text) {
        return
    }
    let text = ctx.message.text
    if (undefined !== ctx.message.reply_to_message) {
        text = ctx.message.reply_to_message.text
    }
    const msg = text.replace(/^\/tweet ?/, '')

    if (msg.length <= 3) {
        return
    }
    return postTweet(ctx, msg)
})

bot.startPolling()
console.log(`Bot ready!`)
