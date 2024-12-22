import { app } from "./dom.js";
import { asideElem, rightSide } from "./ref.js";

export { toggleTab, createElement, addToDom, notification, reCalculateWidth };

function toggleTab(element, imgElement, imgOpen, imgClose) {
  if (element.classList.contains("TabClosed")) {
    element.classList.remove("TabClosed");
    if (imgOpen) {
      imgElement.setAttribute("src", imgOpen);
    }
  } else {
    element.classList.add("TabClosed");
    if (imgClose) {
      imgElement.setAttribute("src", imgClose);
    }
  }
}

function createElement(tag) {
  return document.createElement(tag);
}

function addToDom(parent, child) {
  parent.appendChild(child);
}

function notification(message, type) {
  const elm = createElement("div");
  elm.classList.add("notification");
  elm.innerHTML = message;

  switch (type) {
    case "error":
      elm.style.color = "red";
      break;
    case "normal":
      elm.style.color = "white";
      break;
  }
  addToDom(app, elm);
  setTimeout(() => {
    elm.remove();
  }, 2000);
}

function reCalculateWidth() {
  rightSide.style.setProperty(
    "width",
    `${window.innerWidth - asideElem.offsetWidth}px`,
    "important"
  );
}
