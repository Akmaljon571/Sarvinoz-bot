import TelegramBot from "node-telegram-bot-api";
import dotenv from "dotenv"
import { read } from "./utils/FS.js";
import keyboard from "./helpers/keyboard.js";
dotenv.config()

const bot = new TelegramBot(process.env.Sarvinoz_Bot, { polling:true })

bot.onText(/\/start/, msg => {
    const chatId = msg.chat.id

    bot.sendMessage(chatId, `
    \n🛍Онлайн магазин парфюмерии
    \n🇰🇷 Корейские,качественные товары  
    \n👨🏻/👱🏻‍♀️ Мужские и женские уходы для лица 
    \n💵 Низкие цены 
    \n📍Доставка: Ташкент / Янгиюль 
    \nДля заказа пишем на личку @dioraa_17`, {
        reply_markup: {
            keyboard: [
                [ "Mahsulotlarni Ko'rish🚘🛍", "Admin bilan bo'g'lanish👩‍💻" ],
            ],
            resize_keyboard:true
        },
    })
})

bot.on("text", msg => {
    const chatId = msg.chat.id
    const mahsulotlar =  read("mahsulotlar.json")

    if (msg.text == "Mahsulotlarni Ko'rish🚘🛍") {
        bot.sendMessage(chatId, `
        \n✅Keratin balzam shampunlari
        \n✅Maska shampunlari 
        \n✅ sochimiz rasayam mayinligi va qalinligi uchun xizmat qiluvchi mahsulotlari
        \n✅Tenla judayam sfati yahw  chqvoti
        `, {
            reply_markup:{
                keyboard: keyboard.menu,
                resize_keyboard: true
            }
        })
    }

    if (msg.text == "Asosiy Menu🔚") {
        bot.sendMessage(chatId, `
        \n🛍Онлайн магазин парфюмерии
        \n🇰🇷 Корейские,качественные товары  
        \n👨🏻/👱🏻‍♀️ Мужские и женские уходы для лица 
        \n💵 Низкие цены 
        \n📍Доставка: Ташкент / Янгиюль 
        \nДля заказа пишем на личку @dioraa_17`, {
            reply_markup: {
                keyboard: [
                    [ "Mahsulotlarni Ko'rish🚘🛍", "Admin bilan bo'g'lanish👩‍💻" ],
                ],
                resize_keyboard:true
            },
        })
    }

    if (msg.text == "Admin bilan bo'g'lanish👩‍💻") {
        bot.sendMessage(chatId, `
        \nAdmin👩‍💻: @dioraa_17,
        \nInstagram:\nhttps://t.me/Dioras_kosmetika 
        \nTelegram:\nhttps://t.me/Dioras_kosmetika 
        `)
    }

    if (mahsulotlar.find(e => e.name == msg.text)) {
        const mahsulot = mahsulotlar.find(e => e.name == msg.text)
        bot.sendPhoto(chatId, mahsulot.img, {
            caption: `
            \n✅${mahsulot.Title}
            \nNomi:${mahsulot.name} \nNarxi: ${mahsulot.Narx}  🤷🏻‍♀
            \nZakaz Berish uchun Adminga Murojat qiling @dioraa_17`,
            reply_markup: {
                inline_keyboard: [
                    [
                        {
                            text: "Telegram kanal",
                            url: "https://t.me/Dioras_kosmetika"
                        },
                        {
                            text: "Zakaz Berish",
                            url: "https://t.me/dioraa_17"
                        }
                    ]
                ]
            }
        })
    }

    if (msg.text == "/admin") {
        bot.sendMessage(chatId, `
        \nAdmin👩‍💻: @dioraa_17
        `)
    }
})