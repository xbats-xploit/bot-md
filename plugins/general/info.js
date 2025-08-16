export default {
    command: 'info',
    description: 'Bot information',
    category: 'general',
    usage: '',
    example: '.info',
    aliases: ['botinfo', 'about'],
    
    async execute(context) {
        const { sock, msg } = context
        const uptime = process.uptime()
        const hours = Math.floor(uptime / 3600)
        const minutes = Math.floor((uptime % 3600) / 60)
        const seconds = Math.floor(uptime % 60)
        
        const infoText = `
┌─「 ʙᴏᴛ ɪɴғᴏʀᴍᴀᴛɪᴏɴ 」
│⿻ ɴᴀᴍᴇ: ᴠɪᴛᴀᴀ ʙᴏᴛ
│⿻ ᴠᴇʀsɪᴏɴ: 1.0.0
│⿻ ᴘʟᴀᴛғᴏʀᴍ: ɴᴏᴅᴇ.ᴊs
│⿻ ʀᴜɴᴛɪᴍᴇ: ${hours}ʜ ${minutes}ᴍ ${seconds}s
│⿻ ᴍᴇᴍᴏʀʏ: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} ᴍʙ
│⿻ ᴀᴜᴛʜᴏʀ: ɴᴏᴠɪɪ
└──────────────

⎙ sᴏᴄɪᴀʟ ᴍᴇᴅɪᴀ:
⿻ ᴛᴇʟᴇɢʀᴀᴍ : https://t.me/vitaa_imutt
⿻ ᴡʜᴀᴛsᴀᴘᴘ : wa.me/6287837597549`

        try {
            await sock.sendMessage(msg.key.remoteJid, {
                text: infoText
            }, { quoted: msg })
        } catch (error) {
            await sock.sendMessage(msg.key.remoteJid, {
                text: '❌ ᴇʀʀᴏʀ sᴇɴᴅɪɴɢ ɪɴғᴏʀᴍᴀᴛɪᴏɴ'
            }, { quoted: msg })
        }
    }
}
