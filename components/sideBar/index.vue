<template>
  <div class="sidebar">
    <header class="sidebar-header">
      <div class="input">
        <span class="mdi mdi-24px mdi-magnify"></span>
        <input placeholder=" Search" v-model="searchQuery"/>
        <span class="mdi mdi-24px mdi-filter-variant"></span>
      </div>
      <img class="add-btn" src="assets/img/add.png"/>
    </header>
    <ul class="message-list">
      <li
          v-for="chat in filteredChats"
          :key="chat.id"
          :class="{ active: activeChatId === chat.id }"
          class="message-item"
          @click="$emit('select-chat', chat.id)"
      >
        <div class="message-content">
          <img :src="chat.avatar" alt="Avatar" class="avatar"/>
          <div class="message-details">
            <h class="name-message">{{ chat.name }}</h>
            <p class="description">{{ chat.description }}</p>
            <div class="message-actions">
              <button class="btn-inbox outlined">Inbox</button>
              <button class="btn-group outlined">Group</button>
            </div>
          </div>
          <div class="extra-details">
            <span class="date">Jul 18</span>
            <span v-if="chat.unreadMessages" class="notif">{{ chat.unreadMessages }}</span>
            <span class="mdi mdi-chevron-down"></span>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import {ref, computed} from "vue";

const props = defineProps({
  chats: Array,
  activeChatId: Number,
});

const searchQuery = ref("");
const filteredChats = computed(() => {
  return props.chats.filter((chat) =>
      chat.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});
</script>


<style>
.sidebar {
  width: 30%;
  background: #f7f9fc;
  border-right: 1px solid #ddd;
  overflow-y: auto;
}

.name-message {
  font-size: 13px;
  font-weight: bold;
  margin-top: 5px
}

.description {
  font-size: 12px;
  margin-top: -5px
}

.sidebar-header {
  display: flex;
  height: 70px;
  padding: 10px;
  align-items: center;
  border-bottom: 1px solid #ddd;
}

.input {
  display: flex;
  align-items: center;
  height: 30px;
  width: 100%;
  border: 2px solid #aaa;
  border-radius: 10px;
  padding: 0.5rem 0;
}

.input span {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 10px;
  color: #888;
}

input {
  all: unset;
  flex: 1;
  padding: 0 10px;
}

.add-btn {
  margin-left: 10px;
  height: 45px;
  width: 45px;
  border: 1px solid #007bff;
  border-radius: 10px;
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

.message-content {
  display: flex;
  height: 80px;
  align-items: center;
}

.avatar {
  width: 75px;
  height: 75px;
  border-radius: 10px;
  margin-right: 10px;
}

.message-details {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}

.message-actions {
  display: flex;
  gap: 10px;
  align-self: flex-start;
  margin-top: -12px;
}

.extra-details {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  margin-right: 10px;
  margin-left: auto;
}

.extra-details .date {
  font-size: 12px;
  color: #333;
}

.extra-details .notif {
  display: inline-block;
  font-size: 12px;
  font-weight: bold;
  color: white;
  background-color: #FF0000;
  padding: 2px 6px;
  border-radius: 4px;
}

.extra-details .mdi-chevron-down {
  font-size: 18px;
  color: #888;
  cursor: pointer;
  transition: color 0.3s;
}

.extra-details .mdi-chevron-down:hover {
  color: #333;
}

.btn-group {
  padding: 5px 10px;
  font-size: 0.7rem;
  cursor: pointer;
  border: 1px solid #27d492;
  border-radius: 5px;
  height: 23px;
  width: 50%;
  background: none;
  color: #27d492;
  transition: background-color 0.3s, color 0.3s;
}

.btn-group:hover {
  background-color: #27d492;
  color: white;
}

.btn-inbox {
  padding: 5px 10px;
  font-size: 0.7rem;
  cursor: pointer;
  border: 1px solid #FF0000;
  border-radius: 5px;
  height: 23px;
  width: 50%;
  background: none;
  color: #FF0000;
  transition: background-color 0.3s, color 0.3s;
}

.btn-inbox:hover {
  background-color: #FF0000;
  color: white;
}
</style>
