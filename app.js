const config = require('./config')
const Twitter = require('twitter')
const Telegraf = require('telegraf')

console.log(`Initializing Telegram bot...`)
const bot = new Telegraf(config.telegram.token)

const tweet = (ctx, msg) => {
    const from = ctx.message.from.username
    console.log(`Tweet from ${from}: ${msg}`)

    // TODO: send tweet and reply with link to it

    return ctx.replyWithHTML(`Tweeting <pre>${msg}</pre>`)
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

    console.log(ctx.message)
    if (msg.length <= 3) {
        return
    }
    return tweet(ctx, msg)
})

bot.startPolling()
console.log(`Bot ready!`)
