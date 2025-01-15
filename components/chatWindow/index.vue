<template>
  <main class="chat-window">
    <!-- اگر چتی انتخاب نشده -->
    <div v-if="!activeChat" class="no-chat-selected">
      <p>Please select a chat to view messages</p>
    </div>

    <!-- نمایش چت -->
    <div v-else class="chat-content">
      <header class="chat-header">
        <h3>{{ activeChat.name }}</h3>
      </header>
      <div class="chat-messages">
        <div
            v-for="(msg, index) in activeChat.messages"
            :key="index"
            class="chat-message"
        >
          <p class="sender">{{ msg.sender }}</p>
          <p class="message">{{ msg.content }}</p>
          <span class="time">{{ msg.time }}</span>
        </div>
      </div>
      <footer class="chat-footer">
        <input
            v-model="newMessage"
            type="text"
            placeholder="Type a message..."
            @keyup.enter="sendMessage"
        />
        <button @click="sendMessage">Send</button>
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
      newMessage: "",
    };
  },
  methods: {
    sendMessage() {
      if (this.newMessage.trim() && this.activeChat) {
        this.$emit("send-message", this.newMessage);
        this.newMessage = "";
      }
    },
  },
};
</script>

<style>
/* Chat window styles */
.chat-window {
  width: 70%;
  display: flex;
  flex-direction: column;
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
  padding: 10px;
  background: #f5f5f5;
  border-bottom: 1px solid #ddd;
}

.chat-messages {
  flex-grow: 1;
  padding: 10px;
  overflow-y: auto;
}

.chat-message {
  margin-bottom: 15px;
}

.sender {
  font-weight: bold;
}

.message {
  margin: 5px 0;
}

.time {
  font-size: 0.8rem;
  color: #666;
}

.chat-footer {
  display: flex;
  padding: 10px;
  border-top: 1px solid #ddd;
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
</style>
