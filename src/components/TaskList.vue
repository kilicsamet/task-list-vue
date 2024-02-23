<template>
  <div>
    <h1>Tasks</h1>
    <table class="task-table">
      <thead>
        <tr>
          <th>Title</th>
          <th>Occurrence</th>
          <th>Time</th>
          <th>Priority</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="task in tasks" :key="task.id">
          <td>{{ task.title }}</td>
          <td>{{ task.occurrence }}</td>
          <td>{{ task.time }}</td>
          <td>{{ task.priority }}</td>
          <td>
            <button @click="showDetails(task)">Details</button>
          </td>
        </tr>
      </tbody>
    </table>

    <div v-if="selectedTask" class="modal">
      <div class="modal-content">
        <span class="close" @click="closeModal">&times;</span>
        <h2>Task Details</h2>
        <p><strong>Title:</strong> {{ selectedTask.title }}</p>
        <p><strong>Priority:</strong> {{ selectedTask.priority }}</p>
        <p><strong>Occurrence:</strong> {{ selectedTask.occurrence }}</p>
        <p><strong>description:</strong> {{ selectedTask.description }}</p>
        <h2>lastCompletedEvent</h2>
        <p><strong>type:</strong> {{ selectedTask.lastCompletedEvent.type }}</p>
        <p>
          <strong>datetime:</strong>
          {{ selectedTask.lastCompletedEvent.datetime }}
        </p>
        <p>
          <strong>user:</strong> {{ selectedTask.lastCompletedEvent.user.name }}
        </p>
        <p>
          <strong>app:</strong> {{ selectedTask.lastCompletedEvent.user.app }}
        </p>
        <p>
          <strong>authenticator:</strong>
          {{ selectedTask.lastCompletedEvent.user.authenticator }}
        </p>
        <h2>lastCompletedEvent tenants</h2>
        <table class="tenant-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Is Owned By Tipiteq</th>
          <th>Can Use Gift Cards</th>
          <th>Deleted</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="tenant in selectedTask.lastCompletedEvent.user.tenants"
          :key="tenant.id"
        >
          <td>{{ tenant.name }}</td>
          <td>{{ tenant.isOwnedByTipiteq }}</td>
          <td>{{ tenant.canUseGiftCards }}</td>
          <td>{{ tenant.deleted }}</td>
        </tr>
      </tbody>
    </table>
        <h2>responsibleUsers</h2>
     <table class="responsible-user-table">
      <thead>
        <tr>
          <th>Position</th>
          <th>App</th>
          <th>Name</th>
          <th>Email</th>
          <th>IP</th>
          <th>Authenticator</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="responsibleUser in selectedTask.responsibleUsers" :key="responsibleUser.id">
          <td>{{ responsibleUser.position }}</td>
          <td>{{ responsibleUser.responsibleUser.app }}</td>
          <td>{{ responsibleUser.responsibleUser.name }}</td>
          <td>{{ responsibleUser.responsibleUser.email }}</td>
          <td>{{ responsibleUser.responsibleUser.ip }}</td>
          <td>{{ responsibleUser.responsibleUser.authenticator }}</td>
        </tr>
      </tbody>
    </table>
        <h2>events</h2>
        <tr v-for="event in selectedTask.events" :key="event.id">
          <td>
            <p><strong>type:</strong> {{ event.type }}</p>
          </td>
          <td>
            <p><strong>datetime:</strong> {{ event.datetime }}</p>
          </td>
          <td>
            <p><strong>datetime:</strong> {{ event.description }}</p>
          </td>
          <td>
            <p><strong>user:</strong> {{ event.user.name }}</p>
          </td>
          <td>
            <p><strong>app:</strong> {{ event.user.app }}</p>
          </td>
          
          <td>
          <h2>event Tenants</h2>
          <tr v-for="tenant in event.user.tenants " :key="tenant.id">
          <td><p><strong>name:</strong> {{ tenant?.name }}</p></td>
          <td><p><strong>isOwnedByTipiteq:</strong> {{ tenant?.isOwnedByTipiteq}}</p></td>
          <td><p><strong>canUseGiftCards:</strong> {{tenant?.canUseGiftCards }}</p></td>
          <td><p><strong>deleted:</strong> {{ tenant?.deleted}}</p></td>
        </tr>
          </td>
        </tr>
        <h2>Task Tenants</h2>
          <tr v-for="tenant in selectedTask.tenants " :key="tenant.id">
          <td><p><strong>name:</strong> {{ tenant?.name }}</p></td>
          <td><p><strong>isOwnedByTipiteq:</strong> {{ tenant?.isOwnedByTipiteq}}</p></td>
          <td><p><strong>canUseGiftCards:</strong> {{tenant?.canUseGiftCards }}</p></td>
          <td><p><strong>deleted:</strong> {{ tenant?.deleted}}</p></td>
        </tr>
      </div>
    </div>
  
  </div>
</template>

<script>
import { getTasks } from "../services/TaskService";

export default {
  data() {
    return {
      tasks: [],
      selectedTask: null,
    };
  },
  mounted() {
    this.fetchTasks();
  },
  methods: {
    async fetchTasks() {
      try {
        const response = await getTasks();
        this.tasks = response;
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    },
    showDetails(task) {
      this.selectedTask = task;
    },
    closeModal() {
      this.selectedTask = null;
    },
  },
};
</script>

<style scoped>
.modal {
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
  background-color: #fefefe;
  margin: 5% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

/* Tablo stilleri */
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

th, td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

th {
  background-color: #f2f2f2;
}

.responsible-user-table, .tenant-table, .event-table {
  margin-top: 20px;
}

.responsible-user-table th, .responsible-user-table td,
.tenant-table th, .tenant-table td,
.event-table th, .event-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

.responsible-user-table th, .tenant-table th, .event-table th {
  background-color: #f2f2f2;
}
</style>
