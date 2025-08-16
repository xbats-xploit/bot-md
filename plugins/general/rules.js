export default {
    command: 'rules',
    description: 'Display bot usage rules and guidelines',
    category: 'general',
    usage: '',
    example: '.rules',
    aliases: ['rule', 'aturan'],
    
    async execute(context) {
        const { sock, msg, config } = context
        const prefix = config.getPrefix()
        const botName = config.getBotName() || 'Elysia'
        const ownerName = config.get('botSettings', 'author') || 'Kiznavierr'
        
        const rulesText = `⌬〡 ʀᴜʟᴇs & ɢᴜɪᴅᴇʟɪɴᴇs - ${botName}
  ╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌

🍒 ᴘᴇʀᴀᴛᴜʀᴀɴ ᴜᴍᴜᴍ:  

🚫 ᴅɪʟᴀʀᴀɴɢ:  
• Spam perintah (cooldown berlaku)  
• Menggunakan untuk kegiatan ilegal  
• Membagikan konten yang tidak pantas  
• Menyalahgunakan fitur bot  
• Mencoba eksploitasi atau meretas  

✅ ᴅɪɪᴢɪɴᴋᴀɴ:  
• Gunakan perintah dengan benar  
• Baca deskripsi perintah terlebih dahulu  
• Hormati pengguna lain  
• Laporkan bug ke pemilik  
• Ikuti aturan grup  

⚡ sɪsᴛᴇᴍ ʙᴀᴛᴀs:  
• Pengguna gratis: 10 perintah/hari  
• Pengguna premium: Tanpa batas  
• Batas direset setiap hari  
• Beberapa perintah gratis digunakan  

🏆 ᴋᴇᴜɴᴛᴜɴɢᴀɴ ᴘʀᴇᴍɪᴜᴍ:  
• Perintah harian tanpa batas  
• Dukungan prioritas  
• Akses ke fitur premium  
• Tanpa jeda waktu (cooldown)  

👑 ᴏᴡɴᴇʀ ᴄᴏɴᴛᴀᴄᴛ:
• Nama: ${ownerName}
• Untuk dukungan & upgrade premium  

⚠️ ᴘᴇʟᴀɴɢɢᴀʀᴀɴ:  
• Melanggar aturan dapat berakibat banned  
• Banding dapat diajukan ke pemilik  
• Sanksi bisa bersifat sementara atau permanen

🍓 ᴄᴏᴍᴍᴀɴᴅs:
• ${prefix}menu - Main menu
• ${prefix}allmenu - All commands
• ${prefix}owner - Contact owner
• ${prefix}premium - Premium info

╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌
By using ${botName}, you agree to these rules! 🍡`

        try {
            await sock.sendMessage(msg.key.remoteJid, {
                text: rulesText
            }, { quoted: msg })
        } catch (error) {
            await sock.sendMessage(msg.key.remoteJid, {
                text: '❌ ᴇʀʀᴏʀ sᴇɴᴅɪɴɢ ʀᴜʟᴇs'
            }, { quoted: msg })
        }
    }
}
