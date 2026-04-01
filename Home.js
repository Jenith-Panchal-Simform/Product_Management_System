export function initHome(render) {
    const cardParent = document.querySelector(".main__card-container");
    if (localStorage.length === 0) {
        cardParent.innerHTML = "<h2>No items to show</h2>"
    }
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const value = JSON.parse(localStorage.getItem(key));
        const markup = `<div class="main__card">
            <figure class="card-img">
                <img src=${value.image} alt="">
            </figure>
            <div class="card-desc">
                <p>Id: ${key}</p>
                <p>Name: ${value.name}</p>
                <p>Price: ${value.price}</p>
                <p class ="scroll-text">Desc: ${value.desc}</p>
                <button type="button" aria-pressed="false" class="editBtn btn" data-edit data-id=${key} >Edit</button>
            </div>
        </div>`;
        cardParent.innerHTML += markup;
        console.log(key, value)
    }
    document.addEventListener("click", (e) => {
        if (e.target.matches("[data-edit]")) {
            console.log("Edit button clicked");
            const id = e.target.dataset.id;
            history.pushState({}, "", `/?page=create&id=${id}`);
            render("/create");
        }
        if (e.target.matches("[data-filter]")) {
            const filter = e.target.dataset.action;
            if (localStorage.length === 0) {
                return;
            }
            const cards = document.querySelectorAll(".main__card");
            let items = [];

            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                const value = JSON.parse(localStorage.getItem(key));
                items.push({
                    id: key,
                    ...value
                });
            }
            if (filter === "name") {
                items.sort((a, b) => a.name.localeCompare(b.name));
            } else if (filter === "price") {
                items.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
            }
            let markup = "";
            items.forEach((item) => {
                markup += `
                        <div class="main__card">
                        <figure class="card-img">
                            <img src=${item.image} alt="">
                        </figure>
                        <div class="card-desc">
                            <p>Id: ${item.id}</p>
                            <p>Name: ${item.name}</p>
                            <p>Price: ${item.price}</p>
                            <p class="scroll-text">Desc: ${item.desc}</p>
                            <button class="editBtn btn" data-edit data-id=${item.id}>Edit</button>
                        </div>
                        </div>`;
            });
            cardParent.innerHTML = markup;
        }
    });

}
