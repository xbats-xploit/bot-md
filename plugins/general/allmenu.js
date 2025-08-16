import { getAllCategories, getPluginsByCategory, getPlugins } from '../../lib/loader.js'
import path from 'path'
import fs from 'fs'
import os from 'os'

const runtimes = (seconds) => {
    seconds = Number(seconds)
    var d = Math.floor(seconds / (3600 * 24))
    var h = Math.floor(seconds % (3600 * 24) / 3600)
    var m = Math.floor(seconds % 3600 / 60)
    var s = Math.floor(seconds % 60)
    var dDisplay = d > 0 ? d + (d == 1 ? " day, " : " days, ") : ""
    var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : ""
    var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : ""
    var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : ""
    return dDisplay + hDisplay + mDisplay + sDisplay
}

const readMore = String.fromCharCode(8206).repeat(4001)

export default {
    command: 'allmenu',
    aliases: ['allmenu', 'allcommands', 'allcmd'],
    category: 'general',
    description: 'Show all commands',
    usage: '',
    cooldown: 3,

    async execute(context) {
        const { sock, msg, config, sender } = context
        const prefix = config.getPrefix()
        const allPlugins = getPlugins()
        const categories = getAllCategories()
        
        const botName = config.getBotName() || 'Layla'
        const ownerName = config.get('botSettings', 'author') || 'vitaa'
        const user = context.db?.getUser(sender)
        const isOwner = context.db?.isOwner(sender) || false
        const isAdmin = context.db?.isAdmin(sender) || false
        const isPremium = context.db?.isPremium(sender) || false
        
        const userName = user?.name || msg.pushName || 'User'
        const userLimit = user?.limit ?? 0
        const maxLimit = context.db?.getSetting ? (context.db.getSetting('dailyLimit') || 50) : 50
        const premiumText = isOwner ? 'Owner' : (isPremium ? 'Premium' : 'Free')
        const uptime = runtimes(process.uptime())
        
        // Get database size
        let dbSize = 'Unknown'
        try {
            const dbPath = path.join(process.cwd(), 'database', 'users.json')
            if (fs.existsSync(dbPath)) {
                const dbSizeBytes = fs.statSync(dbPath).size
                dbSize = dbSizeBytes > 1000000 
                    ? `${(dbSizeBytes / 1000000).toFixed(2)} MB` 
                    : `${(dbSizeBytes / 1000).toFixed(2)} KB`
            }
        } catch (error) {
            dbSize = 'Unknown'
        }

        try {
            // Group plugins by category
            const categorized = {}
            const availablePlugins = allPlugins.filter(plugin => {
                if (plugin.ownerOnly && !isOwner) return false
                if (plugin.adminOnly && !isAdmin && !isOwner) return false
                return true
            })

            for (const plugin of availablePlugins) {
                const cat = (plugin.category || 'other').toLowerCase()
                if (!categorized[cat]) categorized[cat] = []
                categorized[cat].push(plugin)
            }

            const categoryIcons = {
                'admin': '👑',
                'owner': '🔱',
                'general': '📋',
                'user': '👤',
                'group': '👥',
                'fun': '🎮',
                'media': '🎨',
                'tools': '🔧',
                'search': '🔍',
                'downloader': '📥',
                'ai': '🤖'
            }

            // Build menu text using FontStyler
            let menuText = `${global.FontStyler.toSmallCaps('Hiii')}! ${userName}, ${global.FontStyler.toSmallCaps("I'm")} ${botName}, ${global.FontStyler.toSmallCaps('Yaemiko. Silakan ketik *.allmenu* untuk lihat fitur')}.
╭───ᛝ「 𝗜𝗡𝗙𝗢 𝗬𝗔𝗘𝗠𝗜𝗞𝗢 」
│︎‹𝟹 *${global.FontStyler.toSmallCaps('Premium')}:* ${premiumText} 🅟
│‹𝟹︎ *${global.FontStyler.toSmallCaps('Limit')}:* ${userLimit}/${maxLimit} 🅛
│‹𝟹 *${global.FontStyler.toSmallCaps('Uptime')}* : *${uptime}*
│‹𝟹 *${global.FontStyler.toSmallCaps('Version')}* : *3.0.0*
│‹𝟹 *${global.FontStyler.toSmallCaps('Prefix Used')}* : *[ ${prefix} ]*
│‹𝟹︎ *${global.FontStyler.toSmallCaps('HomePage')}:* https://vita.my.id
│‹𝟹︎ *${global.FontStyler.toSmallCaps('Database')}:* ${dbSize}
╰──────────────ᛝ
${global.FontStyler.toSmallCaps('Hii Kak🌸Aku yaemiko di sini untuk kasih informasi, bantu ngerjain tugas tertentu, dan kasih dukungan langsung lewat pesan WhatsApp')}.
${readMore}

`

            const sortedCats = Object.keys(categorized).sort()
            
            sortedCats.forEach(cat => {
                const icon = categoryIcons[cat] || '📂'
                const categoryName = cat.charAt(0).toUpperCase() + cat.slice(1)
                
                menuText += `*ㅤㅤㅤㅤㅤㅤ⪩ ${global.FontStyler.toSmallCaps(categoryName.toUpperCase())} ⪨\n`
                
                const sortedPlugins = categorized[cat].sort((a, b) => a.command.localeCompare(b.command))
                
                sortedPlugins.forEach(plugin => {
                    const isPremiumCmd = plugin.premium ? '🅟' : ''
                    const isLimitCmd = plugin.limit ? '🅛' : ''
                    menuText += `*❏* ${prefix}${global.FontStyler.toSmallCaps(plugin.command)} ${isPremiumCmd} ${isLimitCmd}\n`
                })
                
                menuText += `\n\n`
            })

            menuText += `${global.FontStyler.toSmallCaps('powered by vitaa')}`

            // Send with external ad reply
            await sock.sendMessage(msg.key.remoteJid, {
                text: menuText,
                contextInfo: {
                    externalAdReply: {
                        title: botName || 'Vitaa-MD',
                        body: ownerName || 'Laylaa',
                        thumbnail: fs.existsSync(path.join(process.cwd(), 'src', 'images', 'Vitaa.jpeg')) 
                            ? fs.readFileSync(path.join(process.cwd(), 'src', 'images', 'Vitaa.jpeg'))
                            : Buffer.alloc(0),
                        sourceUrl: 'https://github.com/Novi-md',
                        mediaType: 1,
                        renderLargerThumbnail: true,
                    }
                }
            }, { quoted: msg })

        } catch (error) {
            console.error('Allmenu error:', error)
            await sock.sendMessage(msg.key.remoteJid, {
                text: '❌ Failed to generate allmenu. Please try again.'
            }, { quoted: msg })
        }
    }
}
