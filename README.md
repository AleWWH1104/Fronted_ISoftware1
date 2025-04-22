# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript and enable type-aware lint rules. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

---

## Cambios realizados para la pagina de servicios

- Dentro de la carpeta `public` se guardaron las imágenes de los servicios 1 al 6.
- Se creó dentro de la carpeta `pages` el archivo `ServiciosPage.jsx` y `ServiciosPage.css`.
- Dentro de `App.jsx` se importó la función `ServiciosPage` y se implementó la ruta para la página de servicios.
- En `index.html` se agregó un `<link>` para importar la fuente **Catchy Mager**.
