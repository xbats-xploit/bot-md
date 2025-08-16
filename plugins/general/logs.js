export default {
    command: 'logs',
    description: 'Display recent bot features and updates',
    category: 'general',
    usage: '',
    example: '.logs',
    aliases: ['changelog', 'updates'],
    
    async execute(context) {
        const { sock, msg, config } = context
        const prefix = config.getPrefix()
        const botName = config.getBotName() || 'Elysia'
        
        const logsText = `⌬〡 ʟᴏɢs & ᴜᴘᴅᴀᴛᴇs - ${botName}
╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌  
🌸 ᴘᴇᴍʙᴀʀᴜᴀɴ ᴛᴇʀʙᴀʀᴜ 🌸  

📅 *02 Agustus 2025*  
• ❀ Penambahan sistem menu dinamis  
• ❀ Kategori perintah terorganisir rapi  
• ❀ Perintah ${prefix}allmenu ditambahkan  
• ❀ Tampilan menu dibuat mirip *moon-bot*
• ❀ Auto-kategorisasi plugin  

📅 *Pembaruan Sebelumnya*  
• ❀ Sistem *hot-reload* plugin  
• ❀ Database lokal JSON  
• ❀ Perlindungan *anti-spam*  
• ❀ Fitur manajemen grup  
• ❀ Perintah khusus pemilik bot  
• ❀ Sistem pengguna premium  
╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌  
🍥 ᴘᴇʀɪɴᴛᴀʜ:  
• ${prefix}menu - Menampilkan daftar kategori  
• ${prefix}menu [kategori] - Menampilkan perintah dalam kategori  
• ${prefix}allmenu - Menampilkan semua perintah  
• ${prefix}logs - Menampilkan catatan log  

🍒 ꜰɪᴛᴜʀ ʙᴀʀᴜ ᴀᴋᴀɴ ʜᴀᴅɪʀ:  
• ✧ Integrasi AI  
• ✧ Fitur unduh konten  
• ✧ Perintah permainan  
• ✧ Sistem ekonomi  
╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌
Keep using ${botName} for the best experience! 🍓`

        try {
            await sock.sendMessage(msg.key.remoteJid, {
                text: logsText
            }, { quoted: msg })
        } catch (error) {
            await sock.sendMessage(msg.key.remoteJid, {
                text: '❌ ᴇʀʀᴏʀ sᴇɴᴅɪɴɢ ʟᴏɢs'
            }, { quoted: msg })
        }
    }
}
