import {defineStore} from 'pinia';
import avatar1 from "@/assets/img/avatar1.png";
import avatar2 from "@/assets/img/avatar2.png";
import avatar3 from "@/assets/img/avatar3.png";

export const useChatStore = defineStore('chat', {
    state: () => ({
        chats: [
            {
                id: 1,
                name: "کافه",
                avatar: avatar1,
                time: "10:49 AM",
                description: "TRITA Intelligent Innovations",
                unreadMessages: 3,
                messages: [
                    {
                        sender: "Eng. Sahba Abdoli",
                        flag: 'send',
                        avatar: avatar1,
                        content: "گواهی دومی قدیمی‌تر از اولیه",
                        time: "21:19",
                    },
                    {
                        sender: "me",
                        flag: 'receive',
                        avatar: avatar1,
                        content: "نمیدونم، باید حذف شده باشه. باید چک کنم.",
                        time: "21:24",
                    },
                ],
            },
            {
                id: 2,
                name: "code Bot",
                avatar: avatar2,
                time: "10:49 AM",
                description: "TRITA Intelligent Innovations",
                unreadMessages: '',
                messages: [
                    {
                        sender: "User 1", content: "سلام!", time: "10:00 AM", flag: 'send',
                    },
                    {
                        sender: "Mahdi", content: "سلام، چطوری؟", time: "10:01 AM", flag: 'send',
                    },
                ],
            },
            {
                id: 3,
                name: "salam",
                avatar: avatar3,
                time: "10:49 AM",
                description: "yoyo",
                messages: [
                    {
                        sender: "User 1", content: "فایل ارسال شد", time: "11:00 AM", flag: 'send',
                    },
                ],
            },
        ],
    }),

});
