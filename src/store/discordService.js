import axios from 'axios';

const BASE_URL = 'https://discord.com/api/v9';

// Замените 'YOUR_BOT_TOKEN' на токен вашего бота Discord
const headers = {
  'Authorization': 'Bot MTIwOTEwNDkyMDI5MzI3Nzc2Nw.G1AAIx.kon4wEWqQ5pDSGvXISCbf-QK-WWMUJerQxzX4E'
};

// Функция для получения сообщений из канала Discord по его ID
async function getChannelMessages(channelId) {
  try {
    const response = await axios.get(`${BASE_URL}/channels/${channelId}/messages`, { headers });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch channel messages:', error);
    throw error;
  }
}

export { getChannelMessages };
