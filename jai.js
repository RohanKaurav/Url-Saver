let store=[];
let inputEl=document.getElementById("inEl");
let inBtn=document.getElementById("btn");
let ulEle=document.getElementById("ulEl");
const dltBtn=document.getElementById("dltbtn");
const storedItems=JSON.parse(localStorage.getItem("store"));
const tabBtn=document.getElementById("tab_btn")


tabBtn.addEventListener("click",function(){
    chrome.tabs.query({active:true,currentWindow:true},function(tabs){
        store.push(tabs[0].url);
        localStorage.setItem("store",JSON.stringify(store));
        rendorlist();
    })
    
})

if(storedItems){
    store=storedItems;
    rendorlist();
}
dltBtn.addEventListener("dblclick",function(){
    localStorage.clear();
    store=[];
    rendorlist();
})
inBtn.addEventListener("click",function(){
    if(inputEl.value!="")
    store.push(inputEl.value);
    inputEl.value="";
    //string ko phir se array me badal diya
    localStorage.setItem("store",JSON.stringify( store ))
    rendorlist();
    
})

function delet(str){
    store=store.filter(item=>item!=str);
    localStorage.setItem("store",JSON.stringify( store ))
    rendorlist();
}

function rendorlist(){
    let listitems="";
    for(let i=0;i<store.length;i++){
        //  listitems+="<li><a href='" + store[i] +"'>"+store[i]+ "</a></li>" + "<button onClick=\"delet('" + store[i] + "')\"> " + "✕" +"</button>";
            
           


        listitems+=`
        <li>
            <a href='${store[i]}' target='_blank'>
                  ${store[i]}
            </a>
            <button class="delete-btn" data-url="${store[i]}">✕</button>
        </li>
        `
    }
    ulEle.innerHTML=listitems;

    const deleteBtns = document.querySelectorAll(".delete-btn");
    deleteBtns.forEach(btn => {
        btn.addEventListener("click", function() {
            const urlToDelete = btn.getAttribute("data-url");
            delet(urlToDelete);
        });
    });
}