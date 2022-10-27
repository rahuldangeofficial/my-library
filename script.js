
let openBtn=document.getElementById('open-btn');
let modelContainer=document.getElementById('model-container');
let closeBtn=document.getElementById('close-btn');
let space=document.getElementById("space");

openBtn.addEventListener("click",()=>{
    modelContainer.style.display='block';
})

closeBtn.addEventListener('click',()=>{
    modelContainer.style.display='none';
})

window.addEventListener('click',(e)=>{
    if(e.target===modelContainer){
        modelContainer.style.display='none';
    }
})

let myLibrary=[];

// setting Library to be stored in local storage
function setData() {
  localStorage.setItem(`myLibrary`, JSON.stringify(myLibrary));
}

function restore() {
  if(!localStorage.myLibrary) {
      console.log("No data available on local storage");
  }else {
      let objects = localStorage.getItem('myLibrary') // gets information from local storage to use in below loop to create DOM/display
      objects = JSON.parse(objects);
      myLibrary = objects;
      console.log("Data detected and restored from local storage");
  }
}

restore();

//Book Constructor
class Book{
  constructor(title,author,pages,readStatus){
    this.title=title;
    this.author=author;
    this.pages=pages;
    this.readStatus=readStatus;
  }
}

function addBookToLibrary(title,author,pages,readStatus){
  if(title===''||author===""||pages===""||readStatus===""){
    alert("Please enter all details!");
    return;
  }
    event.preventDefault();
    myLibrary[myLibrary.length]=new Book(title,author,pages,readStatus);
    setData();
    form.reset();
    modelContainer.style.display='none';
    let bookID=myLibrary.length-1;
    addBookToDisplay(bookID,title,author,pages,readStatus);
}    

//display functions

function addBookToDisplay(bookID,title,author,pages,readStatus){
  var newCard=document.createElement("div");
  newCard.classList.add("card");

  let htmlCode=`
  <div>
      <div class="card-block">
          <p style="font-size: 0.8rem;text-transform:uppercase;color: rgb(36, 36, 36);opacity: 0.8;">Book Name</p>
          <p style="font-size: 1.2rem;">${title}</p>
      </div>
      <div class="card-block">
          <p style="font-size: 0.8rem;text-transform:uppercase;color: rgb(36, 36, 36);opacity: 0.8;">Author Name</p>
          <p style="font-size: 1.2rem;">${author}</p>
      </div>
      <div class="card-block">
          <p style="font-size: 0.8rem;text-transform:uppercase;color: rgb(36, 36, 36);opacity: 0.8;">Page Count</p>
          <p style="font-size: 1.2rem;">${pages}</p>
      </div>
      <div class="card-block">
          <p style="font-size: 0.8rem;text-transform:uppercase;color: rgb(36, 36, 36);opacity: 0.8;">Read Status</p>
          <p style="font-size: 1.2rem;">${readStatus}</p>
      </div>
  </div>
  <div>
      <button class="button-1"  onclick="deleteBook(${bookID})"><i class="fa-solid fa-xmark"></i></button>
  </div>
`;
  
  newCard.innerHTML=htmlCode;
  space.appendChild(newCard);
}

function restoreToScreen(){
  for(let i=0;i<myLibrary.length;i++){
    addBookToDisplay(i,myLibrary[i].title,myLibrary[i].author,myLibrary[i].pages,myLibrary[i].readStatus);
  }
};

restoreToScreen();

function deleteBook(id){
  let num=parseInt(id);
  removeOneElement(myLibrary,num);
  setData()
  space.innerHTML='';
  restoreToScreen();
};

function removeOneElement(arr,index){
  for(let i=index;i<arr.length;i++){
    arr[i]=arr[i+1];
  }
  arr.length=arr.length-1;
  setData()
}


 
