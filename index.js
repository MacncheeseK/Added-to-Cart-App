import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js"
import { getDatabase, ref, push, onValue} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-database.js" 

const appSettings={
  databaseURL:"https://realtime-database-6d6fa-default-rtdb.firebaseio.com/"
}

const app =initializeApp(appSettings);
const database = getDatabase(app);
const shoppingListInDatabase = ref(database, "shoppingList")

const inputFieldElement =document.querySelector('.js-input');
const addButtonElement =document.querySelector('.js-add-to-cart-button');
const shoppingListElement = document.querySelector('.js-shopping-list')

onValue(shoppingListInDatabase, ((snapshot)=>{
  let ListArray = Object.values(snapshot.val())
  claerShoppingListElement();
  ListArray.forEach((item) => appendItemToShoppingListElement(item));
}))

addButtonElement.addEventListener('click',()=>{
  let inputValue = inputFieldElement.value
  push(shoppingListInDatabase, inputValue);
  claerInputfieldElement();
});

function claerInputfieldElement(){
  inputFieldElement.value='';
}
function claerShoppingListElement(){
  shoppingListElement.innerHTML='';
}
function appendItemToShoppingListElement(value){
  shoppingListElement.innerHTML += `<li class="list-items">${value}</li>`
}