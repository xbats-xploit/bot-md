import { siputzxBuffer } from '../../lib/siputzxApi.js'

export default {
    name: 'welcome',
    description: 'Send welcome message when new members join',
    
    async execute(context) {
        const { participants, action, groupId, sock, db } = context
        
        if (action !== 'add') return false
        
        const groupData = db.getGroup(groupId)
        
        if (!groupData.welcome) return false
        
        try {
            const groupMetadata = await sock.groupMetadata(groupId).catch(() => null)
            const groupName = groupMetadata?.subject || 'grup ini'
            
            for (const participant of participants) {
                if (participant.includes(sock.user?.id?.split(':')[0])) continue
                
                const username = `@${participant.split('@')[0]}`
                
                let welcomeMessage = groupData.welcomeText || groupData.welcomeMessage || this.getDefaultMessage()
                
                welcomeMessage = welcomeMessage
                    .replace(/@user/g, username)
                    .replace(/@group/g, groupName)
                    .replace(/@mention/g, username)
                
                try {
                    let avatarUrl = 'https://files.catbox.moe/odtlzv.jpg' // Default avatar
                    try {
                        const profilePic = await sock.profilePictureUrl(participant, 'image').catch(() => null)
                        if (profilePic) {
                            avatarUrl = profilePic
                        }
                    } catch (error) {
                        console.log('Could not get profile picture, using default')
                    }
                    
                    const welcomeImage = await siputzxBuffer('/api/canvas/welcomev4', {
                        avatar: avatarUrl,
                        background: 'https://files.catbox.moe/82kbpc.jpg',
                        description: `Welcome ${username}!`
                    })
                    
                    await sock.sendMessage(groupId, {
                        image: welcomeImage,
                        caption: welcomeMessage,
                        mentions: [participant]
                    })
                } catch (error) {
                    console.error('Error generating welcome image, sending text only:', error)
                    // Fallback to text only
                    await sock.sendMessage(groupId, {
                        text: welcomeMessage,
                        mentions: [participant]
                    })
                }
            }
            
            return true
        } catch (error) {
            console.error('Error sending welcome message:', error)
            return false
        }
    },
    
    getDefaultMessage() {
        return `🎉 *ꜱᴇʟᴀᴍᴀᴛ ᴅᴀᴛᴀɴɢ!* 

🍥 ʜᴀɪ @user! 
✨ ꜱᴇʟᴀᴍᴀᴛ ᴅᴀᴛᴀɴɢ ᴅɪ @group

─ ׅ  নı ׄ 𝗰𝗮ֺ𝗿𝗱 𝗶𝗻𝘁𝗿𝗰᳢ 𝗯𝘆 𝘃ֺ𝗶𝘁𝗮ֺ  ׅ  ░⃝     ׄ 𝅄
──꯭─ׄ─۪─ׄ┈ ⤹⑅⤸ ┈ׄ─۪─ׄ─꯭──ׅ─ׄ
ׄ  ꒽ ׅ  ׄ 🎀 ׅ  ׄ ˒˒ 𝗻𝗮ֺ𝗺𝗮ֺ :
ׄ  ꒽ ׅ  ׄ 🍓 ׅ  ׄ ˒˒ 𝘂𝗺𝘂𝗿 :
ׄ  ꒽ ׅ  ׄ 🪷 ׅ  ׄ ˒˒ 𝗮ֺ𝘀𝗮ֺ𝗹ֺ :
ׄ  ꒽ ׅ  ׄ 🦢 ׅ  ׄ ˒˒ 𝗵𝗰᳢𝗯𝗶 :
 ‌‌ּ ╌─꯭─┉─ׄ─ׅ ⟣ ۫ ׄ ─ׄ─ׅ┉─꯭─╌ ‌‌ּ ‌‌ּ 
𝗴𝗿𝗰᳢𝘂𝞀ׅ 𝗺𝗰᳢𝗯𝗶𝗹ֺ𝞊ׅ 𝗹ֺ𝞊ׅ𝗴𝞊ׅ𝗻𝗱𝘀 
*https://chat.whatsapp.com/INpYEfC4SJN0kpAR2WlnNa?mode=ac_t*
╭─۪──ׄ─╌  ׅ  ♡   ׄ ╌─ׄ──۪╌
🪷 𝘀𝗮ֺ𝗹ֺ𝘂𝗿𝗮ֺ𝗻 𝘀𝗰𝗿𝗶𝞀ׅ𝘁 𝗳𝗿𝞊ׅ𝞊ׅ
*https://whatsapp.com/channel/0029VbAsR7DJ93wcImuxDP3e*
ꜱᴇʟᴀᴍᴀᴛ ʙᴇʀɢᴀʙᴜɴɢ! 🎊`
    }
}
