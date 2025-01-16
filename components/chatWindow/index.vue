<template>
  <main class="chat-window">
    <div v-if="!activeChat" class="no-chat-selected">
      <p>لطفاً یک چت را برای نمایش انتخاب کنید</p>
    </div>
    <div v-else class="chat-content">
      <header class="chat-header">
        <img src="assets/img/avatar1.png" alt="Avatar" class="chat-avatar" />
        <h3 class="chat-name">{{ activeChat.name }}</h3>
      </header>

      <div class="chat-messages">
        <div
            v-for="(msg, index) in activeChat.messages"
            :key="index"
            class="chat-message"
            :class="{ sent: msg.sender === 'me', received: msg.sender !== 'me' }"
        >
          <img src="assets/img/avatar1.png" alt="Avatar" class="message-avatar" />
          <div class="message-bubble">
            <p class="message-content">{{ msg.content }}</p>
            <span class="message-time">{{ msg.time }}</span>
          </div>
        </div>
      </div>

      <footer class="chat-footer">
        <!-- دکمه ارسال عکس و ویدیو -->

        <button @click="emitMessage">
          <i v-if="message" class="mdi mdi-24px mdi-send"></i>
          <i v-else class="mdi mdi-24px mdi-microphone"></i>
        </button>
        <!-- ورودی پیام -->
        <input v-model="message" type="text" placeholder="پیام خود را بنویسید..." @keyup.enter="emitMessage" />

        <!-- دکمه ارسال پیام -->
        <button class="attachment-btn">
          <span class="mdi mdi-24px mdi-paperclip"></span>
        </button>
      </footer>

    </div>
  </main>
</template>

<script setup>
import { ref, watch, nextTick } from "vue";

// دریافت prop
defineProps({
  activeChat: Object,
});

// تعریف داده‌ها
const message = ref("");

// متد ارسال پیام
const emitMessage = () => {
  if (message.value.trim()) {
    // ارسال پیام به والدین
    emit("sendMessage", message.value);
    message.value = ""; // پاک کردن پیام
    scrollToBottom();
  }
};

// اسکرول به انتهای پیام‌ها
const scrollToBottom = () => {
  nextTick(() => {
    const chatMessages = document.querySelector(".chat-messages");
    if (chatMessages) {
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }
  });
};

// ارسال رویداد به والد
const emit = defineEmits(["sendMessage"]);
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
  direction: ltr;
}

.chat-avatar {
  width: 50px;
  height: 50px;
  border-radius: 10px;
  margin: 10px;
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
  border-radius: 10px;
  margin-left: 20px;
  margin-right: 10px;
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
  background-color: #f9f9f9;
}

.chat-footer input {
  flex-grow: 1;
  padding: 10px;
  margin: 10px;
  border: 1px solid #ddd;
  background-color: white;
  border-radius: 15px;
}

.chat-footer button {
  padding: 10px;
  background-color: #fff;
  color: white;
  border: none;
  margin: 10px;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}




.attachment-btn i {
  font-size: 20px;
  color: #fff; /* رنگ آیکون */
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
