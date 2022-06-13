let deleteBtn=document.getElementById('btnDeleteAll');
function deleteData(){
    localStorage.clear();
}
deleteBtn.addEventListener('click',()=>{
deleteData();
});
function callLocal(){
    let Books=localStorage.getItem('books');
    let tableBody=document.getElementById('tableBody');
    let obj;
    if(Books===null){
     obj=[];
    }
    else{
    obj=JSON.parse(Books);
    }
        let html="";
        obj.forEach((element,index)=>{ 
            html+=`<tr>
            <th scope="row">${index+1}</th>
            <td>${element.Book}</td>
            <td>${element.author}</td>
            <td>${element.type}</td>
            <td><button class="btn btn-primary rowButtons" id="${index}" onClick="clickme(this.id)">Delete row</button></td>
          </tr>`;
        });
      tableBody.innerHTML=html;
}
class Library {
    constructor(BookName, author, type) {
        this.BookName = BookName;
        this.author = author;
        this.type = type;
    }
    Clear(){
       document.getElementById('bookname').value="";
       document.getElementById('author').value="";
    }
    LocalStorage(){
    let Books=localStorage.getItem('books');
    let obj;
    if(Books===null){
     obj=[];
    }
    else{
    obj=JSON.parse(Books);
    }
    obj.push({"Book":this.BookName,
    "author":this.author,
    "type":this.type});
    localStorage.setItem('books',JSON.stringify(obj));
    }
    Display() {
        let tableBody=document.getElementById('tableBody');
        let obj=localStorage.getItem('books');
        obj=JSON.parse(obj);
        let html="";
        obj.forEach((element,index)=>{ 
            html+=`<tr>
            <th scope="row">${index+1}</th>
            <td>${element.Book}</td>
            <td>${element.author}</td>
            <td>${element.type}</td>
            <td><button class="btn btn-primary rowButtons" id="${index}" onClick="clickme(this.id)">Delete row</button></td>
          </tr>`;
        });
      tableBody.innerHTML=html;
    }
    checkIf(){
        if(this.BookName.length<=2 || this.author.length<=2){
         return 0;
        }
        else{
            return 1;
        }
    }

}
callLocal();
alert=(warning,message)=>{
    let al=document.getElementById('alert');
    let html=`<div class="alert alert-${warning} alert-dismissible fade show" role="alert">
  <strong>${warning}</strong> ${message}
  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div>`;
al.innerHTML=html;
setTimeout(()=>{
al.innerHTML="";
},2000);
}
let button = document.getElementById('btn');
button.addEventListener('click', (e) => {
    let bookData={
    bookname : document.getElementById('bookname').value,
    author : document.getElementById('author').value,
    Fiction : document.getElementById('Fiction'),
    trueStory : document.getElementById('TrueStory'),
    literature : document.getElementById('Literature')
    }
    let type;
    if (bookData.Fiction.checked) {
        type = bookData.Fiction.value;
    }
    else if (bookData.trueStory.checked) {
        type = bookData.trueStory.value;
    }
    else if (bookData.literature.checked) {
        type = bookData.literature.value;
    }
    let lib = new Library(bookData.bookname, bookData.author, type);
    if(lib.checkIf()){
    lib.LocalStorage();
    lib.Display();
    lib.Clear();
    alert('success','Added Book SuccessFully');
    }
    else{
        alert('danger',"You can't leave any field empty");
    }
    e.preventDefault();
});
function clickme(id){
let bookObj=JSON.parse(localStorage.getItem('books'));
bookObj.splice(id,1);
localStorage.setItem('books',JSON.stringify(bookObj));
callLocal();
}
