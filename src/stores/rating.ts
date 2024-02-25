import { openDB, type IDBPDatabase, type IDBPObjectStore } from "idb";
import { ref } from "vue";


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


export const ratings = ref<Rating[]>([])

let db: IDBPDatabase;
const storeName = 'main'

async function get(key: string) {
  const tx = db.transaction(storeName, 'readonly');
  const store = tx.store as any
  const result = await store.get(key);
  await tx.done
  return result;
}

async function put(key: string, value: any) {
  const tx = db.transaction(storeName, 'readwrite');
  const store = tx.store as any
  console.log(JSON.parse(JSON.stringify(value)))
  const result = await store.put(JSON.parse(JSON.stringify(value)), key);
  await tx.done
  return result;
}

export async function initStorage() {
  db = await openDB('app', 1, {
    upgrade: async (database, oldVersion, newVersion, transaction, event) => {
      db = database
      if(!database.objectStoreNames.contains(storeName)) {
        await db.createObjectStore(storeName)
      }
    },
  });
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve(null)
    }, 1000)
  })
  const storedRatings = await get('ratings')
  console.log(storedRatings)
  ratings.value = storedRatings || []
}

export async function rateEmployee(employeeRating: Rating) {
  ratings.value.push(employeeRating)
  await put('ratings', ratings.value)
}

function jsonToCsv(json: any) {
  const array = [Object.keys(json[0])].concat(json)

  return array.map(it => {
    return Object.values(it).toString()
  }).join('\n')
}

export function exportExcel() {
  const data = "data:text/json;charset=utf-8," + encodeURIComponent(jsonToCsv(ratings.value.map(value => ({
    name: value.employee.name,
    rating: value.rate,
    phoneNumber: value.customer.phoneNumber
  }))));
  const downloaderEl = document.getElementById('downloaderEl');
  downloaderEl?.setAttribute("href", data);
  downloaderEl?.setAttribute("download", "ratings.csv");
  downloaderEl?.click();
}