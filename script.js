
let additem = document.querySelector(".addItems");

let display = document.querySelector(".display");

let clear = document.querySelector(".clearItems");

let inputitem = document.querySelector(".inputitem");

let feedback  = document.querySelector(".popup");

let text = [];

const getList = function (text) {
  display.innerHTML ='';
  text.forEach(function(inputvalue) {
    display.insertAdjacentHTML('beforeend', `<div class="listitems"><h5 class="item-name">${inputvalue}</h5><button type="button" class="done" name="button">&#9745;</button><button type="button" class="edit" name="button">Edit;</button><button type="button" class="remove" name="button">remove;</button></div>`)
    handleItem(inputvalue);
  });

}

const handleItem = function (inputvalue) {
  let listitems = document.querySelectorAll(".listitems");

  listitems.forEach((item) => {
    if(item.querySelector(".item-name").textContent === inputvalue){
          item.querySelector(".done").addEventListener("click", function() {
            item.querySelector(".item-name").classList.toggle("slash");
          });
          item.querySelector(".edit").addEventListener("click", function() {
            inputitem.value = inputvalue;
            display.removeChild(item);
            text = text.filter(function(item) {
              return item !== inputvalue;
            })
          });
          item.querySelector(".remove").addEventListener("click", function() {
            display.removeChild(item);

            text = text.filter(function(item) {
              return item !== inputvalue;
            })
          });
    }
  });

}






const getLocalStorage = function() {
  const todoStorage = localStorage.getItem('text');
  if(todoStorage ==="undefined" || todoStorage === null){
    text = [];
  }else{
      text = JSON.parse(todoStorage);
      getList(text);
  }

}

const setLocalStorage = function(text){
  localStorage.setItem('text',JSON.stringify(text));
}

getLocalStorage();


additem.addEventListener("click", function(){

  let inputvalue = document.querySelector("input").value;
if (inputvalue.length === 0) {
      feedback.innerText = "enter valid value";
      feedback.classList.add("glow");
      setTimeout(function() {
        feedback.classList.remove("glow");
      },3000);
}else{

  text.push(inputvalue);
  setLocalStorage(text);
  getList(text);
  inputitem.value = "";
  /*
  display.classList.add("show")
  display.textContent = inputvalue; */
/*  display.insertAdjacentHTML('beforeend',`<div class="listitems"> ${inputvalue}<button type="button" class="done" name="button">&#9745;</button><button type="button" name="button">Edit;</button><button type="button" name="button">remove;</button></div>`)
  inputvalue.value = ""; */

/*  let done = document.querySelector(".done");
  done.addEventListener("click", function(){
    let listitems = document.querySelector(".listitems");
    listitems.classList.add("slash");
  }) */
}
})


clear.addEventListener("click", function(){
  text = [];
  localStorage.clear();
  getList(text);
})
