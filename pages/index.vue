<template>
  <div id="app" class="chat-app">
    <SideBar :chats="chats" :activeChatId="activeChatId" @selectChat="setActiveChat"/>
    <ChatWindow :activeChat="activeChat" @sendMessage="sendMessage"/>
  </div>
</template>

<script>
export default {
  data() {
    return {
      socket: null,
      chats: useChatStore().chats,
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
      console.log(content)
      if (content.trim() && this.activeChat) {
        const newMessage = {
          sender: "You",
          content,
          time: new Date().toLocaleTimeString(),
        };
        this.activeChat.messages.push(newMessage);
        if (this.socket && this.socket.readyState === WebSocket.OPEN) {
          const payload = JSON.stringify({
            chatId: this.activeChatId,
            message: newMessage,
          });
          this.socket.send(payload);
          this.updateLocalStorage();
        } else {
          console.error("WebSocket is not open. Cannot send message.");
        }
      }
    },

    handleIncomingMessage(payload) {
      try {
        let messageData = null;

        try {
          messageData = JSON.parse(payload);
        } catch (e) {
          messageData = {message: payload};
        }

        if (messageData.chatId && messageData.message) {
          const {chatId, message} = messageData;
          const chat = this.chats.find((c) => c.id === chatId);
          if (chat) {
            chat.messages.push(message);
            localStorage.setItem("chats", JSON.stringify(this.chats));
          }
        }
      } catch (error) {
        console.error("Error processing incoming message:", error);
      }
    },

    updateLocalStorage() {
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

      const savedChats = localStorage.getItem("chats");
      if (savedChats) {
        this.chats = JSON.parse(savedChats);
      }

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
