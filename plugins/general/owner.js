export default {
    command: 'owner',
    description: 'Get owner contact',
    category: 'general',
    usage: '',
    example: '.owner',
    aliases: ['creator', 'author'],
    
    async execute(context) {
        const { sock, msg } = context

        try {
            // Send owner contact with vcard directly
            const vcard = `BEGIN:VCARD
VERSION:3.0
FN:Vitaa
ORG:Bot Developer
TEL;type=CELL;type=VOICE;waid=6289658675858:+62 896-5867-5858
END:VCARD`

            await sock.sendMessage(msg.key.remoteJid, {
                contacts: {
                    displayName: 'Vitaa',
                    contacts: [{
                        vcard: vcard
                    }]
                }
            }, { quoted: msg })
            
        } catch (error) {
            await sock.sendMessage(msg.key.remoteJid, {
                text: '❌ ᴇʀʀᴏʀ sᴇɴᴅɪɴɢ ᴏᴡɴᴇʀ ᴄᴏɴᴛᴀᴄᴛ'
            }, { quoted: msg })
        }
    }
}
