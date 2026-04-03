const Router = {
  init: () => {
    // Handle link clicks
    document.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const url = e.currentTarget.getAttribute("href");
        history.pushState(null, "", "#" + url);
        Router.nav(url);
      });
    });

    // Handle back/forward + manual hash change
    window.addEventListener("hashchange", () => {
      const path = location.hash.slice(1) || "/";
      Router.nav(path);
    });

    window.addEventListener("popstate", () => {
      const path = location.hash.slice(1) || "/";
      Router.nav(path);
    });

    // Initial load
    const initialPath = location.hash.slice(1) || "/";
    Router.nav(initialPath);
  },

  nav: (route) => {
    //  Pages (partials)
    async function Home() {
      const res = await fetch("home.html");
      return await res.text();
    }

    async function Create() {
      const res = await fetch("create.html");
      return await res.text();
    }

    // Route map
    const routes = {
      "/": Home,
      "/create": Create,
    };

    //  Render function
    async function render(path) {
      const app = document.querySelector(".app");
      const component = routes[path];

      if (component) {
        const html = await component();
        app.innerHTML = html;
        if (path === "/create") {
          const module = await import("./CreateHandler.js");
          const params = new URLSearchParams(window.location.search);
          const id = params.get("id");
          module.initCreate(id);
        }
        if (path === "/") {
          const module = await import("./Home.js");
          module.initHome(render);
        }
      } else {
        const html = await Home();
        app.innerHTML = html;
        const module = await import("./Home.js");
        module.initHome(render);
      }
    }

    render(route);
  },
};

export default Router;
