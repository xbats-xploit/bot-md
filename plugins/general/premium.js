export default {
    command: 'premium',
    description: 'Display premium information and benefits',
    category: 'general',
    usage: '',
    example: '.premium',
    aliases: ['prem', 'upgrade'],
    
    async execute(context) {
        const { sock, msg, config, sender } = context
        const prefix = config.getPrefix()
        const botName = config.getBotName() || 'Vitaa'
        const ownerName = config.get('botSettings', 'author') || 'Laylaa'
        const isPremium = context.db?.isPremium(sender) || false
        
        if (isPremium) {
            const premiumText = `⌬〡 ᴘʀᴇᴍɪᴜᴍ sᴛᴀᴛᴜs - ${botName}
✦━━━━━━━━━━━━━━━━━━━━✦  
🌟 sᴇʟᴀᴍᴀᴛ!  
Kamu sudah menjadi pengguna *PREMIUM*

✨ ᴋᴇᴜɴᴛᴜɴɢᴀɴ ᴘʀᴇᴍɪᴜᴍ:  
• ✧ Perintah harian tanpa batas  
• ✧ Tanpa jeda waktu (cooldown)  
• ✧ Dukungan prioritas  
• ✧ Akses fitur premium  
• ✧ Perintah khusus premium  
• ✧ Akses awal fitur terbaru  

🎯 ɴɪᴋᴍᴀᴛɪ ᴘᴇɴɢᴀʟᴀᴍᴀɴ ᴘʀᴇᴍɪᴜᴍ ᴍᴜ!  
✦━━━━━━━━━━━━━━━━━━━━✦
╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌
Thank you for supporting ${botName}! 🍥`

            await sock.sendMessage(msg.key.remoteJid, {
                text: premiumText
            }, { quoted: msg })
        } else {
            const premiumText = `⌬〡 ᴘʀᴇᴍɪᴜᴍ ɪɴꜰᴏ - ${botName}
✦━━━━━━━━━━━━━━━━━━━━✦  
💎 ᴜᴘɢʀᴀᴅᴇ ᴋᴇ ᴘʀᴇᴍɪᴜᴍ!

🆓 ʙᴀᴛᴀsᴀɴ ᴘᴇɴɢɢᴜɴᴀ ɢʀᴀᴛɪs:  
• ✧ 10 perintah per hari  
• ✧ Jeda waktu antar perintah  
• ✧ Akses fitur terbatas  
• ✧ Dukungan basic  

👑 ᴋᴇᴜɴᴛᴜɴɢᴀɴ ᴘʀᴇᴍɪᴜᴍ:  
• ✧ Perintah harian tanpa batas  
• ✧ Tanpa jeda waktu  
• ✧ Dukungan prioritas  
• ✧ Akses fitur premium  
• ✧ Perintah khusus premium  
• ✧ Akses awal fitur terbaru  
• ✧ Permintaan perintah custom  

💰 ʜᴀʀɢᴀ:  
• Hubungi owner untuk harga  
• Banyak metode pembayaran  
• Tarif terjangkau  
• Sangat worth untuk upgrade!  
✦━━━━━━━━━━━━━━━━━━━━✦

📞 ᴄᴏɴᴛᴀᴄᴛ ᴏᴡɴᴇʀ:
• Use ${prefix}owner command
• Name: ${ownerName}
• Ask about premium upgrade

🎁 ᴘᴇɴᴀᴡᴀʀᴀɴ sᴘᴇsɪᴀʟ:  
• Diskon untuk pembelian pertama  
• Paket promo untuk grup  
• Langganan jangka panjang  
╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌
Upgrade now and enjoy unlimited access! ⭐`

            await sock.sendMessage(msg.key.remoteJid, {
                text: premiumText
            }, { quoted: msg })
        }
    }
}
