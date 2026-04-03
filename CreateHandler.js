export function initCreate(id) {
let form=document.querySelector(".system__form");
const idInput = form.elements["id"];
const nameInput = form.elements["name"];
const priceInput = form.elements["price"];
const descInput = form.elements["desc"];
const imageInput = form.elements["image"];

//for edit
if (id) {
  const data = JSON.parse(localStorage.getItem(id));
  if (data) {
    idInput.value = id;
    nameInput.value = data.name;
    priceInput.value = data.price;
    descInput.value = data.desc;
    imageInput.value = data.image;
  }
}

form.addEventListener("submit",(e)=>{
    e.preventDefault()
    console.log("Form submitted")
    const id = idInput.value;
    const name = nameInput.value;
    const price = priceInput.value;
    const desc = descInput.value;
    const image = imageInput.value;
    localStorage.setItem(id,JSON.stringify({name,price,desc,image}))
    console.log(id,name,price,desc,image)
    form.reset();
})

//for preview image
let imageVal=document.querySelector("#image-upload")
let image=document.querySelector("#preview")
imageVal.addEventListener("change",(e)=>{
  let val=e.target.value;
  image.src=val
})
}