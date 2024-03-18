<template>
  <div>
    <ul>
      <li v-for="message in messages" :key="message.id">{{ message.content }}</li>
    </ul>
  </div>
</template>

<script>
import { getChannelMessages } from '../store/discordService';

export default {
  data() {
    return {
      messages: []
    };
  },
  async mounted() {
    try {
      const channelId = '924243937688965130'; // Замените на ID вашего канала Discord
      const messages = await getChannelMessages(channelId);
      this.messages = messages;
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  }
};
</script>
