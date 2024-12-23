
function addToList() {
  let inputEl = document.getElementById("task").value; // Input değerini her tıklamada al
  let ul = document.getElementById("tasklist");
  if(inputEl.trim() !=="")// Boş değer eklenmesini engelle
  {
    let li = document.createElement("li");
    li.appendChild(document.createTextNode(inputEl));
    let deleteBtn = document.createElement("button");
    deleteBtn.textContent ="Sil" //buton metni
    deleteBtn.classList.add("delete-btn") //css sınıfı için
    
    deleteBtn.addEventListener("click", function(){
        ul.removeChild(li) ; //görevi sil
    });

    li.appendChild(deleteBtn);

    ul.appendChild(li);

    document.getElementById("task").value = ""; //görev eklendikten sonra Input değerini temizle


  }
  else{
    alert("Lütfen bir görev giriniz!");
  }
 
}
document.getElementById("addTaskButton").addEventListener("click", addToList);

