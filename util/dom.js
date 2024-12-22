export { app };

const app = await initApp();

function initApp() {
  const root = document.getElementById("root");

  return new Promise((resolve, reject) => {
    if (root) {
      document.addEventListener("DOMContentLoaded", () => {
        console.log("app loaded");
        resolve(root);
      });
    } else {
      console.error("Root was not found. Failed to load");
      reject(false);
    }
  });
}
