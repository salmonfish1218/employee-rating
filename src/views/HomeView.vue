<script setup lang="ts">
import {ref} from 'vue'
import { useRouter } from 'vue-router';
import {exportExcel, ratings} from '../stores/rating'

const employees = ref([{
  id: '1',
  name: 'Employee 1'
},{
  id: '2',
  name: 'Employee 2'
},{
  id: '3',
  name: 'Employee 3'
},{
  id: '4',
  name: 'Employee 4'
}])

const router = useRouter()

function onClickEmployee(employee) {
  router.push({
    name: 'employee',
    query: employee
  })
}
</script>

<template>
  <main>
    <!-- <TheWelcome /> -->
    <div v-for="(employee, i) in employees" :key="i">
      <button @click="() => onClickEmployee(employee)" >
        {{ employee.name }}
      </button>
    </div>
    <button @click="exportExcel">Export</button>
  </main>
</template>
