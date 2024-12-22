import {
  rulerExplorer,
  idExplorer,
  rightSide,
  rulerBrowser,
  idBrowser,
} from "../../util/ref.js";

export default function Ruler() {
  let isResizing = false;
  let startX; // Starting X-coordinate of the mouse
  let startY; // Starting Y-coordinate of the mouse
  let startWidth; // Initial width of the explorer
  let startHeight; // Initial height of the browser
  let currentType;

  (function () {
    // intialize the width of the right side
    rightSide.style.width = `${window.innerWidth - idExplorer.offsetWidth}px`;
  })();

  const startResizing = (type, e) => {
    e.preventDefault();
    isResizing = true;
    currentType = type;

    if (type === "explorer") {
      rulerExplorer.classList.add("rulerClicked");
      startX = e.clientX;
      startWidth = idExplorer.offsetWidth;
    } else if (type === "browser") {
      rulerBrowser.classList.add("rulerClicked");
      startY = e.clientY;
      startHeight = idBrowser.offsetHeight;
    }

    document.addEventListener("mousemove", resize);
    document.addEventListener("mouseup", stopResizing);
  };

  const resize = (e) => {
    if (isResizing) {
      if (currentType === "explorer") {
        const leftWidth = startWidth + (e.clientX - startX);
        const rightWidth = window.innerWidth - idExplorer.offsetWidth;
        rightSide.style.width = `${rightWidth}px`;
        idExplorer.style.width = `${leftWidth}px`;
      } else if (currentType === "browser") {
        const newHeight = startHeight + (startY - e.clientY);
        idBrowser.style.height = `${newHeight}px`;
      }
    }
  };

  const stopResizing = () => {
    isResizing = false; // Deactivate resizing mode
    if (currentType === "explorer") {
      rulerExplorer.classList.remove("rulerClicked");
    } else if (currentType === "browser") {
      rulerBrowser.classList.remove("rulerClicked");
    }
    // Remove event listeners
    document.removeEventListener("mousemove", resize);
    document.removeEventListener("mouseup", stopResizing);
  };

  rulerExplorer.addEventListener("mousedown", (e) =>
    startResizing("explorer", e)
  );
  rulerBrowser.addEventListener("mousedown", (e) =>
    startResizing("browser", e)
  );
}
