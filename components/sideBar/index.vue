<template>
  <aside class="sidebar">
    <header class="sidebar-header">
      <div class="search-container">
        <input type="text" placeholder="🔍 Search" class="search-bar" />
      </div>
      <img class="add-btn" src="assets/img/add.png"/>
    </header>
    <ul class="message-list">
      <li
          v-for="chat in chats"
          :key="chat.id"
          :class="{ active: activeChatId === chat.id }"
          class="message-item"
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
  width: 20%;
  background: #f7f9fc;
  border-right: 1px solid #ddd;
  overflow-y: auto;
}

.sidebar-header {
  display: flex;
  height: 60px  ;
  padding: 10px;
  align-items: center;
  border-bottom: 1px solid #ddd;
}

.search-bar {
  height: 25px;
  flex-grow: 1;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 10px;
}


.add-btn{
  margin-left: 10px;
  height: 40px;
  width: 40px;
  border: 1px solid #007bff;
  border-radius: 8px;
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
.search-container {
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;
}

</style>
