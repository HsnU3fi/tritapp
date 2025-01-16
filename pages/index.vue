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
          avatar: "assets/img/avatar1.png",
          time: "10:49 AM",
          description: "TRITA Intelligent Innovations",
          unreadMessages: 3,
          messages: [
            {
              sender: "Eng. Sahba Abdoli",
              avatar: "https://via.placeholder.com/40",
              content: "گواهی دومی قدیمی‌تر از اولیه",
              time: "21:19",
            },
            {
              sender: "me",
              avatar: " ",
              content: "نمیدونم، باید حذف شده باشه. باید چک کنم.",
              time: "21:24",
            },
          ],
        },
        {
          id: 2,
          name: "yoi Bot",
          avatar: " ",
          time: "10:49 AM",
          description: "TRITA Intelligent Innovations",
          unreadMessages: '',
          messages: [
            {sender: "User 1", content: "سلام!", time: "10:00 AM"},
            {sender: "Mahdi", content: "سلام، چطوری؟", time: "10:01 AM"},
          ],
        },
        {
          id: 3,
          name: "Code Bot",
          avatar: "assets/img/avatar1.png",
          time: "10:49 AM",
          description: "TRITA Intelligent Innovations",
          messages: [
            {sender: "User 1", content: "فایل ارسال شد", time: "11:00 AM"},
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

        // بررسی وضعیت WebSocket قبل از ارسال پیام
        if (this.socket && this.socket.readyState === WebSocket.OPEN) {
          // ارسال پیام به سرور WebSocket
          const payload = JSON.stringify({
            chatId: this.activeChatId,
            message: newMessage,
          });
          this.socket.send(payload);

          // ذخیره‌سازی پیام جدید در Local Storage
          this.updateLocalStorage();
        } else {
          console.error("WebSocket is not open. Cannot send message.");
        }
      }
    },

    handleIncomingMessage(payload) {
      try {
        let messageData = null;

        // بررسی این که آیا payload JSON است یا نه
        try {
          messageData = JSON.parse(payload);
        } catch (e) {
          messageData = {message: payload};
        }

        if (messageData.chatId && messageData.message) {
          const {chatId, message} = messageData;

          // افزودن پیام به چت مرتبط
          const chat = this.chats.find((c) => c.id === chatId);
          if (chat) {
            chat.messages.push(message);

            // بروزرسانی Local Storage با پیام جدید
            localStorage.setItem("chats", JSON.stringify(this.chats));
          }
        }
      } catch (error) {
        console.error("Error processing incoming message:", error);
      }
    },


    updateLocalStorage() {
      // ذخیره‌سازی داده‌ها در Local Storage
      localStorage.setItem("chats", JSON.stringify(this.chats));
    },
  },
  created() {
    if (process.client) {
      this.socket = new WebSocket("ws://localhost:8080");

      this.socket.onmessage = (event) => {
        this.handleIncomingMessage(event.data);
      };

      this.socket.onerror = (error) => {
        console.error("WebSocket error:", error);
      };

      this.socket.onclose = () => {
        console.log("WebSocket connection closed");
      };

      // بارگذاری پیام‌ها از Local Storage
      const savedChats = localStorage.getItem("chats");
      if (savedChats) {
        this.chats = JSON.parse(savedChats);
      }

      // Listener برای تغییرات در Local Storage
      window.addEventListener("storage", (event) => {
        if (event.key === "chats") {
          const updatedChats = JSON.parse(event.newValue);
          this.chats = updatedChats;
        }
      });
    }
  }
}

</script>


<style>
.chat-app {
  display: flex;
  height: 100vh;
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
