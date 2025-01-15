<template>
  <div id="app" class="chat-app">
    <SideBar :chats="chats" :activeChatId="activeChatId" @selectChat="setActiveChat" />
    <ChatWindow :activeChat="activeChat" @sendMessage="sendMessage" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      socket: null, // اتصال WebSocket
      chats: [
        {
          id: 1,
          name: "Code Bot",
          avatar: "https://via.placeholder.com/50",
          time: "10:49 AM",
          description: "TRITA Intelligent Innovations",
          messages: [
            {
              sender: "Eng. Sahba Abdoli",
              avatar: "https://via.placeholder.com/40",
              content: "گواهی دومی قدیمی‌تر از اولیه",
              time: "21:19",
            },
            {
              sender: "me",
              avatar: "https://via.placeholder.com/40",
              content: "نمیدونم، باید حذف شده باشه. باید چک کنم.",
              time: "21:24",
            },
          ],
        },
        {
          id: 2,
          name: "Code Bot",
          avatar: "https://via.placeholder.com/50",
          time: "10:49 AM",
          description: "TRITA Intelligent Innovations",
          messages: [
            { sender: "User 1", content: "سلام!", time: "10:00 AM" },
            { sender: "Mahdi", content: "سلام، چطوری؟", time: "10:01 AM" },
          ],
        },
        {
          id: 3,
          name: "Code Bot",
          avatar: "https://via.placeholder.com/50",
          time: "10:49 AM",
          description: "TRITA Intelligent Innovations",
          messages: [
            { sender: "User 1", content: "فایل ارسال شد", time: "11:00 AM" },
          ],
        },
        // سایر چت‌ها...
      ],
      activeChatId: null,
    };
  },
  computed: {
    activeChat() {
      return this.chats.find((chat) => chat.id === this.activeChatId);
    },
  },
  methods: {
    setActiveChat(chatId) {
      this.activeChatId = chatId;
    },
    sendMessage(content) {
      if (content.trim() && this.activeChat) {
        const newMessage = {
          sender: "You",
          content,
          time: new Date().toLocaleTimeString(),
        };

        // افزودن پیام به چت فعلی
        this.activeChat.messages.push(newMessage);

        // ارسال پیام به سرور WebSocket
        const payload = JSON.stringify({
          chatId: this.activeChatId,
          message: newMessage,
        });
        this.socket.send(payload);
      }
    },
    handleIncomingMessage(payload) {
      const { chatId, message } = JSON.parse(payload);

      // افزودن پیام به چت مرتبط
      const chat = this.chats.find((c) => c.id === chatId);
      if (chat) {
        chat.messages.push(message);
      }
    },
  },
  created() {
    // اتصال به WebSocket سرور
    this.socket = new WebSocket("ws://localhost:8080");

    // مدیریت پیام‌های ورودی
    this.socket.onmessage = (event) => {
      this.handleIncomingMessage(event.data);
    };

    // مدیریت خطاها
    this.socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    // بستن اتصال
    this.socket.onclose = () => {
      console.log("WebSocket connection closed");
    };
  },
};

</script>

<style>
/* General layout */
.chat-app {
  display: flex;
  height: 100vh;
}

.sidebar {
  width: 30%;
  background: #f7f9fc;
  border-right: 1px solid #ddd;
  overflow-y: auto;
}

.chat-window {
  width: 70%;
  display: flex;
  flex-direction: column;
}

/* Sidebar styles */
.sidebar-header {
  display: flex;
  padding: 10px;
  align-items: center;
  border-bottom: 1px solid #ddd;
}

.search-bar {
  flex-grow: 1;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.action-btn {
  margin-left: 10px;
  padding: 8px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.message-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.message-item {
  padding: 10px;
  border-bottom: 1px solid #ddd;
  cursor: pointer;
  transition: background-color 0.3s;
}

.message-item:hover {
  background-color: #f1f1f1;
}

.message-item.active {
  background-color: #d9eaff;
}

/* Chat window styles */
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

/* Responsive design */
@media (max-width: 768px) {
  .chat-app {
    flex-direction: column;
  }

  .sidebar {
    width: 100%;
    border-right: none;
    border-bottom: 1px solid #ddd;
  }

  .chat-window {
    width: 100%;
  }
}
</style>
