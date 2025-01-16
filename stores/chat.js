import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useChatStore = defineStore('chat', () => {
    // وضعیت (state)
    const message = ref("");
    const activeChat = ref(null);

    // اقدامات (actions)
    const sendMessage = (content) => {
        if (content.trim()) {
            // افزودن پیام جدید به چت فعال (مثال ساده)
            activeChat.value?.messages.push({
                content,
                sender: "me",
                time: new Date().toLocaleTimeString(),
            });
            message.value = ""; // پاک کردن پیام
        }
    };

    const scrollToBottom = () => {
        const chatMessages = document.querySelector(".chat-messages");
        if (chatMessages) {
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
    };

    return {
        message,
        activeChat,
        sendMessage,
        scrollToBottom,
    };
});
