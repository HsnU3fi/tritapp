<template>
  <main class="chat-window">
    <div v-if="!activeChat" class="no-chat-selected">
      <p>لطفاً یک چت را برای نمایش انتخاب کنید</p>
    </div>
    <div v-else class="chat-content">
      <!-- هدر با آواتار و نام -->
      <header class="chat-header">
        <img :src="activeChat.avatar" alt="Avatar" class="chat-avatar" />
        <h3 class="chat-name">{{ activeChat.name }}</h3>
      </header>

      <!-- بخش پیام‌ها -->
      <div class="chat-messages">
        <div
            v-for="(msg, index) in activeChat.messages"
            :key="index"
            class="chat-message"
            :class="{ sent: msg.sender === 'me', received: msg.sender !== 'me' }"
        >
          <img :src="msg.avatar" alt="Avatar" class="message-avatar" />
          <div class="message-bubble">
            <p class="message-content">{{ msg.content }}</p>
            <span class="message-time">{{ msg.time }}</span>
          </div>
        </div>
      </div>

      <!-- بخش ارسال پیام -->
      <footer class="chat-footer">
        <input
            v-model="message"
            type="text"
            placeholder="پیام خود را بنویسید..."
            @keyup.enter="emitMessage"
        />
        <button @click="emitMessage">ارسال</button>
      </footer>
    </div>
  </main>
</template>

<script>
export default {
  props: {
    activeChat: Object,
  },
  data() {
    return {
      message: "",
    };
  },
  methods: {
    emitMessage() {
      if (this.message.trim()) {
        this.$emit("sendMessage", this.message);
        this.message = "";
        this.scrollToBottom();
      }
    },
    scrollToBottom() {
      this.$nextTick(() => {
        const chatMessages = this.$el.querySelector(".chat-messages");
        chatMessages.scrollTop = chatMessages.scrollHeight;
      });
    },
  },
};
</script>

<style>
/* استایل صفحه چت */
.chat-content {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.chat-window {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  direction: rtl;
}

.no-chat-selected {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  font-size: 1.2rem;
  color: #888;
}

.chat-header {
  display: flex;
  align-items: center;
  padding: 10px;
  background: #f5f5f5;
  border-bottom: 1px solid #ddd;
  direction: ltr; /* برای انتقال به سمت چپ */
}

.chat-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px; /* فاصله بین آواتار و متن */
}

.chat-name {
  font-size: 1.2rem;
  font-weight: bold;
  color: #333;
}

.chat-messages {
  flex-grow: 1;
  padding: 10px;
  overflow-y: auto;
  background-color: #f9f9f9;
}

.chat-message {
  display: flex;
  align-items: flex-end;
  margin-bottom: 15px;
  flex-direction: row-reverse;
}

.message-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-left: 10px;
}

.message-bubble {
  max-width: 60%;
  padding: 10px;
  background: #e9e9e9;
  position: relative;
}

.sent .message-bubble {
  background: #007bff;
  color: white;
  margin-left: auto;
  border-radius: 10px 10px 0 10px;
}

.received .message-bubble {
  background: #f1f1f1;
  border-radius: 10px 10px 10px 0;
}

.message-content {
  margin: 0;
}

.message-time {
  font-size: 0.8rem;
  color: #666;
  margin-top: 5px;
  text-align: right;
}

.chat-footer {
  position: relative;
  display: flex;
  padding: 10px;
  border-top: 1px solid #ddd;
  background-color: #fff;
}

.chat-footer input {
  flex-grow: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.chat-footer button {
  margin-left: 10px;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

@media (max-width: 768px) {
  .chat-messages {
    max-height: calc(100vh - 100px);
  }
  .chat-footer input {
    font-size: 0.9rem;
  }
}
</style>
