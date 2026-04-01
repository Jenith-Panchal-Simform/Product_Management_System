export function initCreate() {
  console.log("Create page JS loaded");
let form=document.querySelector(".container__form");
form.addEventListener("submit",(e)=>{
    e.preventDefault()
    const id=form.elements["id"].value;
    const name =form.elements['name'].value;
    const price=form.elements["price"].value;
    const desc=form.elements["desc"].value
    const image=form.elements["image"].value

    localStorage.setItem(id,JSON.stringify({name,price,desc,image}))
    console.log(id,name,price,desc,image)
    form.reset();
})

}