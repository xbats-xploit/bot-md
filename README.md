# BY LAYLAA - IMUPP 
# BELI NO ENC HARGA 
# 30K NO UP 
# 50K TIAP UPDATE 
[ CHAT TELEGRAM] [:https://t.me/laylaa_imup ]

`## VITAA - QUEEN`
`TELEGRAM: https://t.me/vitaa_imutt`
`YOUTUBE: https://youtube.com/@pityaimut?si=n9iI2J5VBnceOT1E`
`FACEBOOK: https://www.facebook.com/share/1CKnzkCHhw/`
> INSTAGRAM : fitya_taa
! YA MAU BELI SEWA BOT CHAT AJA DI ATAS VITA


## Table of Contents
- [Requirements](#requirements)
- [Server Recommendations](#server-recommendations)
- [Database](#database)
- [Configuration](#configuration)
- [Installation](#installation)
- [Pairing Code](#pairing-code)
- [Plugins](#plugins)
- [Troubleshooting](#troubleshooting)

## Requirements

- [x] Server vCPU/RAM 1/1GB (Min)
- [x] Node.js v18+
- [x] WhatsApp Account
- [x] Stable Internet Connection

## Pairing Code

To enable pairing code authentication, edit `config.json`:

```json
{
   "pairingMode": true
}
```

## Plugins

Create new plugins in the `plugins/` folder:

```javascript
export default {
    command: 'hello',
    description: 'Say hello',
    category: 'general',
    usage: 'hello',
    cooldown: 5,
    
    async execute(context) {
        const { reply } = context
        await reply('Hello World!')
    }
}
```

### Plugin Properties

- `command`: Command name
- `description`: Command description  
- `category`: Plugin category
- `usage`: Usage example
- `cooldown`: Cooldown in seconds
- `ownerOnly`: Owner only command
- `groupOnly`: Group only command
- `execute`: Function to execute

## Troubleshooting

### Error saat install
- Pastikan Node.js sudah terinstall (versi 18+)
- Hapus folder `node_modules` dan `package-lock.json`, lalu `npm install` ulang
- Pastikan koneksi internet stabil

### Bot tidak bisa kick/promote
- Pastikan bot sudah jadi admin di grup
- Cek apakah target adalah admin (admin tidak bisa kick admin)

### Session bermasalah
- Hapus folder `sessions`
- Login ulang dengan QR code atau pairing



<p align="center">.....</p>

