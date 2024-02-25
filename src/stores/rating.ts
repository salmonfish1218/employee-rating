// import { ref, computed } from 'vue'
// import { defineStore } from 'pinia'

// export const useRatingStore = defineStore('rating', () => {
//   const count = ref(0)
//   const doubleCount = computed(() => count.value * 2)
//   function rateEmployee(employee, rating: number) {
//     count
//   }

//   return { count, doubleCount, increment }
// })

export interface Employee {
  id: string;
  name: string; 
}

export interface Customer {
  phoneNumber: string;
}

export interface Rating {
  employee: Employee;
  rate: number;
  customer: Customer
}


export let ratings: Rating[] = []

export function loadLocalStorageRatings() {
  const storedRatings = localStorage.getItem('ratings')
  ratings = JSON.parse(storedRatings || '[]')
}

export function rateEmployee(employeeRating: Rating) {
  ratings.push(employeeRating)
  console.log(ratings)
  localStorage.setItem('ratings', JSON.stringify(ratings));
}

function convertToCSV(arr) {
  const array = [Object.keys(arr[0])].concat(arr)

  return array.map(it => {
    return Object.values(it).toString()
  }).join('\n')
}

export function exportExcel() {
  const data = "data:text/json;charset=utf-8," + encodeURIComponent(convertToCSV(ratings.map(value => ({
    name: value.employee.name,
    rating: value.rate,
    phoneNumber: value.customer.phoneNumber
  }))));
  const downloaderEl = document.getElementById('downloaderEl');
  downloaderEl?.setAttribute("href", data);
  downloaderEl?.setAttribute("download", "ratings.csv");
  downloaderEl?.click();
}