export function initHome(render) {
  const cardParent = document.querySelector(".main__card-container");
  const search = document.querySelector("#search");

  renderCards(getItems());
  bindEvents();
  bindSearch();

  function getItems() {
    const products = JSON.parse(localStorage.getItem("products")) || [];

    return products.map((product) => ({
      id: product.id,
      ...product,
    }));
  }

  function renderCards(items) {
    console.log(items);
    if (!items.length) {
      cardParent.innerHTML = "<h2>No items to show</h2>";
      return;
    }

    cardParent.innerHTML = items.map(createCard).join("");
  }

  function createCard(item) {
    return `
      <div class="main__card">
        <figure class="card-img-container">
          <img class="card-img" src="${item.image}" alt="">
        </figure>
        <div class="card-desc">
          <p>Id: ${item.id}</p>
          <p>Name: ${item.name}</p>
          <p>Price: ${item.price}</p>
          <p class="scroll-text">Desc: ${item.desc}</p>

          <button class="editBtn btn" data-edit data-id="${item.id}">Edit</button>
          <button class="deleteBtn btn" data-delete data-id="${item.id}">Delete</button>
        </div>
      </div>
    `;
  }

  function bindEvents() {
    cardParent.addEventListener("click", handleClick);
  }

  function handleClick(e) {
    const target = e.target;

    if (target.matches("[data-edit]")) {
      const id = target.dataset.id;
      // history.pushState({}, "", `/?page=create&id=${id}`);
      // render("/create");
    history.pushState({}, "", `#/create?id=${id}`);
render("/create");
    }

    if (target.matches("[data-delete]")) {
      const id = target.dataset.id;
      let confirmation=confirm("Do you want to delete?");
      if (!confirmation) return 
      deleteProduct(id)
      renderCards(getItems());
    }

    if (target.matches("[data-filter]")) {
      const filter = target.dataset.action;
      let items = getItems();

      if (filter === "name") {
        items.sort((a, b) => a.name.localeCompare(b.name));
      } else if (filter === "price") {
        items.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
      }

      renderCards(items);
    }
  }

  // search
  function bindSearch() {
    search.addEventListener("keyup", debounce(handleSearch, 300));
  }

  function handleSearch(e) {
    const value = e.target.value.toLowerCase();

    const filtered = getItems().filter((item) =>
      Object.values(item).some((val) =>
        String(val).toLowerCase().includes(value),
      ),
    );

    if (!filtered.length) {
      cardParent.innerHTML = "<h2>No items match your search</h2>";
      return;
    }

    renderCards(filtered);
  }

  // debounce
  function debounce(cb, delay) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => cb(...args), delay);
    };
  }

  //deleteProduct
  function deleteProduct(id) {
    let products = JSON.parse(localStorage.getItem("products")) || [];
    // Remove product with matching id
    products = products.filter((product) => product.id !== id);
    localStorage.setItem("products", JSON.stringify(products));
  }
}
