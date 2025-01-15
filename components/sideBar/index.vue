<template>
  <aside class="sidebar">
    <header class="sidebar-header">
      <input type="text" placeholder="Search" class="search-bar" />
      <button class="action-btn">⚙️</button>
    </header>
    <ul class="message-list">
      <!-- لیست چت‌ها -->
      <li
          v-for="(chat, index) in chats"
          :key="chat.id"
          class="message-item"
          :class="{ active: activeChatId === chat.id }"
          @click="$emit('select-chat', chat.id)"
      >
        <div>
          <h4>{{ chat.name }}</h4>
          <p>{{ chat.description }}</p>
        </div>
      </li>
    </ul>
  </aside>
</template>

<script>
export default {
  props: {
    chats: Array,
    activeChatId: Number,
  },
};
</script>

<style>
/* Sidebar styles */
.sidebar {
  width: 30%;
  background: #f7f9fc;
  border-right: 1px solid #ddd;
  overflow-y: auto;
}

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
</style>
