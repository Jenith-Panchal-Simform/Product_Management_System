const Router = {
  init: () => {
    // Handle link clicks
    document.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const url = e.currentTarget.getAttribute("href");
        if (url.includes("?")) {
          history.pushState(null, "", url);
        } else {
          history.pushState(null, "", "#" + url);
        }
        Router.nav(url);
      });
    });

    // Handle back/forward + manual hash change
    window.addEventListener("hashchange", () => {
      Router.nav(getRoute());
    });
    
    window.addEventListener("popstate", () => {
      Router.nav(getRoute());
    });

    // Initial load
    const getRoute = () => {
      const params = new URLSearchParams(window.location.search);
      const page = params.get("page");
    
      if (page) return `/${page}`;
    
      const hashPath = location.hash.slice(1);
      if (hashPath) return hashPath;
    
      return "/home";
    };
    
    Router.nav(getRoute());
    
    const initialPath = getRoute();
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
      "/home": Home,
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
        if (path === "/home") {
          const module = await import("./Home.js");
          module.initHome(render);
        }
      } else {
        history.replaceState(null, "", "#/home");
        render("/home");
      }
    }

    render(route);
  },
};

export default Router;
