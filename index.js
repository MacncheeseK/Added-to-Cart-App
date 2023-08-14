import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-database.js" 
import { initializeAppCheck, ReCaptchaEnterpriseProvider } from "firebase/app-check";

const appSettings={
  databaseURL:"https://realtime-database-6d6fa-default-rtdb.firebaseio.com/"
}

const app =initializeApp(appSettings);
const database = getDatabase(app);
const shoppingListInDatabase = ref(database, "shoppingList")

const inputFieldElement =document.querySelector('.js-input');
const addButtonElement =document.querySelector('.js-add-to-cart-button');
const shoppingListElement = document.querySelector('.js-shopping-list')
// Create a ReCaptchaEnterpriseProvider instance using your reCAPTCHA Enterprise
// site key and pass it to initializeAppCheck().
const appCheck = initializeAppCheck(app, {
  provider: new ReCaptchaEnterpriseProvider("6Le8LqcnAAAAACYCK-uoCT8y6EOsMuel4FdWTdlv"),
  isTokenAutoRefreshEnabled: true // Set to true to allow auto-refresh.
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