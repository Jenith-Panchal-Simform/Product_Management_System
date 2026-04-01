export function initCreate() {
    const cardParent=document.querySelector(".main__card-container");
    if(localStorage.length===0)
    {
        cardParent.innerHTML="<h2>No items to show</h2>"
    }
    for(let i = 0;i<localStorage.length;i++)
    {
        const key=localStorage.key(i);
        const value = JSON.parse(localStorage.getItem(key));
        const markup=`<div class="main__card">
            <figure class="card-img">
                <img src=${value.image} alt="">
            </figure>
            <div class="card-desc">
                <p>Id: ${key}</p>
                <p>Name: ${value.name}</p>
                <p>Price: ${value.price}</p>
                <p class ="scroll-text">Desc: ${value.desc}</p>
                <button type="button" aria-pressed="false" class="editBtn btn">Edit</button>
            </div>
        </div>`;
        cardParent.innerHTML += markup;
        console.log(key,value)
    }
}
