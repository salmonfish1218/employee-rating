<script setup lang="ts">
import {computed, defineProps, onMounted, ref} from 'vue'
import { useRoute } from 'vue-router';
import {rateEmployee, Employee} from '../stores/rating'
import router from '@/router';

const route = useRoute();
const starCount = 5;
const employee = computed<Employee>(() => ({
    id: route.query.id as string,
    name: route.query.name as string
}))
const rating = ref(1)
const phoneNumber = ref('')

function onClickRate(newRating: number) {
    rating.value = newRating
}

function onClickConfirm() {
    rateEmployee({
        employee: employee.value,
        rate: rating.value,
        customer: {
            phoneNumber: phoneNumber.value
        }
    })
    router.push({
        name: 'ty'
    })
}

</script>

<template>
    <div>
        <div>
            {{ route.query.name }}
        </div>
        <button @click="() => onClickRate(i+1)" v-for="(_, i) in new Array(starCount)" :key="i">
            star {{ i+1 }}
        </button>
        <div>
            <input placeholder="Phone number" v-model="phoneNumber"/>
        </div>
        <button @click="onClickConfirm">Confirm</button>
    </div>
</template>
