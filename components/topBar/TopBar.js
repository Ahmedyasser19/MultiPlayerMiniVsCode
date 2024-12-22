import {
  idExplorer,
  BtnToggleSideBar,
  BtnToggleTerminal,
} from "../../util/ref.js";

import { toggleTab, reCalculateWidth } from "../../util/shared.js";

export default function TopBar() {
  console.log("TopBar");

  BtnToggleSideBar.onclick = () => {
    toggleTab(idExplorer);
    reCalculateWidth();
  };

  BtnToggleTerminal.onclick = () => {
    toggleTab(idExplorer);
  };

  document.addEventListener("keydown", (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "b") {
      e.preventDefault();
      toggleTab(idExplorer);
      reCalculateWidth();
    }
  });
}
