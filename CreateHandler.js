export function initCreate(id) {
let form=document.querySelector(".system__form");
const idInput = form.elements["id"];
const nameInput = form.elements["name"];
const priceInput = form.elements["price"];
const descInput = form.elements["desc"];
const imageInput = form.elements["image"];
const submitBtn=document.querySelector(".form-addBtn")
//for image preview and upload
let imageVal=document.querySelector("#image-upload")
let image=document.querySelector("#preview")

let isEdit=false;
//for edit
if (id) {
  const data = JSON.parse(localStorage.getItem(id));
  if (data) {
    idInput.value = id;
    nameInput.value = data.name;
    priceInput.value = data.price;
    descInput.value = data.desc;
    imageInput.value = data.image;
    image.src=data.image;
    submitBtn.textContent = "Update";
    isEdit=true;
  }
}

form.addEventListener("submit",(e)=>{
    e.preventDefault()
    const id = idInput.value;
    const name = nameInput.value;
    const price = priceInput.value;
    const desc = descInput.value;
    const image = imageInput.value;
    if(!isEdit && localStorage.getItem(id))
    {
      alert("Id already exists,Please choose a different id")
      return;
    }
    localStorage.setItem(id,JSON.stringify({name,price,desc,image}))
    if (isEdit) {
      alert("Item edited successfully");
    } else {
      alert("Item added successfully");
    }
    form.reset();
})

//for preview image

imageVal.addEventListener("change",(e)=>{
  let val=e.target.value;
  image.src=val
})
}