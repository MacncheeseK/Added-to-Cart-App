import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-database.js" 
import { initializeAppCheck, ReCaptchaEnterpriseProvider } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app-check.js";

const appSettings={
  databaseURL:"https://realtime-database-6d6fa-default-rtdb.firebaseio.com/"
}
const firebaseConfig = {
  apiKey: "AIzaSyCp6710LAtzerQS5inZQVx1QI7lCLpKFaE",
  authDomain: "realtime-database-6d6fa.firebaseapp.com",
  databaseURL: "https://realtime-database-6d6fa-default-rtdb.firebaseio.com",
  projectId: "realtime-database-6d6fa",
  storageBucket: "realtime-database-6d6fa.appspot.com",
  messagingSenderId: "252571650495",
  appId: "1:252571650495:web:444e4f42b5403b1e1c790a"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const shoppingListInDatabase = ref(database, "shoppingList")

const inputFieldElement =document.querySelector('.js-input');
const addButtonElement =document.querySelector('.js-add-to-cart-button');
const shoppingListElement = document.querySelector('.js-shopping-list')

const appCheck = initializeAppCheck(app, {
  provider: new ReCaptchaEnterpriseProvider("6Le8LqcnAAAAACYCK-uoCT8y6EOsMuel4FdWTdlv"),
  isTokenAutoRefreshEnabled: true
});

onValue(shoppingListInDatabase, ((snapshot) =>{
  if(snapshot.exists()){
    let ListArray = Object.entries(snapshot.val());
    claerShoppingListElement();
    ListArray.forEach((item) =>{
      let currentItem = item;
      let currentItemID =currentItem[0];
      let currentItemVlaue=currentItem[1];
      
      appendItemToShoppingListElement(currentItem);
    })
  }else{
    shoppingListElement.innerHTML='No items here ... yet'
  }
  
  
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
function appendItemToShoppingListElement(item){
  let itemID=item[0];
  let itemValue= item[1]
  let newElement = document.createElement('li')
  newElement.textContent = itemValue;
  newElement.addEventListener('click', ()=>{
    let exactLocationOfIItemInDatabase =ref(database, `shoppingList/${itemID}`);
    remove(exactLocationOfIItemInDatabase);
    console.log(itemID)
  })
  shoppingListElement.append(newElement);
};