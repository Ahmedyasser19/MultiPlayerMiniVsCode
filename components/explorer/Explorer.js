import {
  idProjectName,
  idFiles,
  BtnAddFile,
  BtnAddFolder,
  idTaps,
  idWelcome,
} from "../../util/ref.js";
import {
  toggleTab,
  createElement,
  addToDom,
  notification,
} from "../../util/shared.js";
import Tap from "../editor/tap/Tap.js";
export default function Explorer() {
  initButtons();

  // addFolder();
  // deleteFolder();
  // renameFile();
  // renameFolder();
}

function initButtons() {
  toggleFiles(idProjectName, idFiles);

  BtnAddFile.onclick = () => {
    takeUserInput("file");
  };
  BtnAddFolder.onclick = () => {
    takeUserInput("folder");
  };

  async function takeUserInput(type) {
    const inputElement = createElement("input");
    inputElement.setAttribute("id", "nameInput");
    inputElement.placeholder = `Enter ${type} name`;
    addToDom(idFiles, inputElement);
    disableButton(type);
    inputElement.focus();

    // wait for user action
    const isFail = await handleInputStatus(inputElement, type);
    if (isFail) {
      return;
    } else {
      add(inputElement, type);
    }
  }

  function handleInputStatus(userInputElem, buttonType) {
    return new Promise((resolve) => {
      setTimeout(() => {
        document.addEventListener("click", handleClick);
        document.addEventListener("keydown", handleEscape);
        userInputElem.addEventListener("keydown", handleEnter);
      }, 100);

      const handleEscape = (e) => {
        if (e.key == 27 || e.key === "Escape") {
          e.preventDefault();
          userInputElem.remove();
          document.removeEventListener("click", handleEscape);
          enableButton(buttonType);
          resolve(true);
        }
      };

      const handleClick = (e) => {
        e.preventDefault();
        if (e.target != userInputElem) {
          userInputElem.remove();
          document.removeEventListener("click", handleClick);
          enableButton(buttonType);
          resolve(true);
        }
      };

      const handleEnter = (e) => {
        if (e.key == 13 || e.key === "Enter") {
          e.preventDefault();
          document.removeEventListener("keydown", handleEnter);
          resolve(false);
        }
      };
    });
  }

  function add(userInputElem, type) {
    const fileName = userInputElem.value.trim();

    if (fileName) {
      if (type === "file") {
        createFile(fileName, idFiles);
      } else {
        createFolder(fileName);
      }
      userInputElem.remove();
    } else {
      userInputElem.remove();
      notification(`Can't create ${type} with no name`, "error");
      enableButton(type);
      return;
    }

    function createFile(fileText, elementId) {
      const divElem = createElement("div");
      const leftDiv = createElement("div");
      const rightDiv = createElement("div");
      const pElem = createElement("p");
      const imgElem = createElement("img");
      const closeImg = createElement("img");
      const closeBtnElem = createElement("button");

      const ext = fileText.match(/\.([a-zA-Z0-9]+)$/);
      const fileExtension = ext ? ext[1] : null;
      pElem.textContent = fileText;

      //create unique id for the div
      const uniqueId = createId();
      divElem.id = uniqueId;

      // Set up the main container
      divElem.classList.add(
        "flex",
        "justifyBetween",
        "alignCenter",
        "heightFull",
        "widthFull",
        "cursorPointer"
      );

      // Set up the left side with image and text
      leftDiv.classList.add("flex", "flexRow", "alignCenter");
      extensionAllowed(ext[1])
        ? imgElem.setAttribute("src", `./components/svg/${fileExtension}.svg`)
        : imgElem.setAttribute("src", "./components/svg/defaultExt.svg");

      imgElem.classList.add("logo");
      leftDiv.appendChild(imgElem);
      leftDiv.appendChild(pElem);

      divElem.onmouseenter = () => {
        closeBtnElem.classList.add("show", "hover");
        closeBtnElem.classList.remove("hide");
      };
      divElem.onmouseleave = () => {
        closeBtnElem.classList.remove("show");
        closeBtnElem.classList.add("hide");
      };

      //delete button logic
      closeBtnElem.onclick = (e) => {
        e.stopPropagation();
        const opened = document.querySelectorAll(`[id="${uniqueId}"]`);
        opened.forEach((elem) => {
          elem.remove();
        });
      };

      // Set up the right side with the button
      rightDiv.classList.add("flex", "alignCenter", "justifyCenter");
      closeImg.setAttribute("src", "./components/svg/close.svg");
      closeBtnElem.appendChild(closeImg);
      rightDiv.appendChild(closeBtnElem);

      // Append left and right divs to the main container
      divElem.appendChild(leftDiv);
      divElem.appendChild(rightDiv);

      //open the tab in the tap bar
      divElem.onclick = () => {
        // if the tab is not opened open a new tab
        if (!elemContainsId(idTaps, divElem.id)) {
          Tap([
            fileText,
            imgElem.getAttribute("src"),
            "./components/svg/close.svg",
            uniqueId,
          ]);
        } else {
          return;
        }

        // when it gets clicked it shows the file in the id: editorCode
      };
      // Add the main container to the DOM
      addToDom(elementId, divElem);

      function extensionAllowed(ext) {
        const allowedExtensions = ["html", "css", "js", "txt"];
        return allowedExtensions.includes(ext);
      }
    }

    function createFolder() {
      const divElem = createElement("div");
      const img = createElement("img");

      divElem.classList.add(
        "flex",
        "justifyBetween",
        "alignCenter",
        "heightFull",
        "widthFull",
        "cursorPointer"
      );
      imgElem.classList.add("logo");
      imgElem.setAttribute("src", "./components/svg/arrowRight");

      // when clicked user can press ctrl dlt or cmd dlt to delete it and its children
      // warn the user if any children before deleteion
      // when right clicked show a menu that contains delete , rename

      divElem.onclick = (e) => {
        //change image to opened folder
        toggleTab(
          divElem,
          imgElem,
          "./components/svg/arrowDown",
          "./components/svg/arrowRight"
        );
      };
    }

    function deleteEvent() {}
  }
}

function disableButton(type) {
  if (type === "file") {
    BtnAddFile.disabled = "true";
    BtnAddFile.style.opacity = "0.3";
    BtnAddFile.style.cursor = "not-allowed";
  } else {
    BtnAddFolder.disabled = "true";
    BtnAddFolder.style.opacity = "0.3";
    BtnAddFolder.style.cursor = "not-allowed";
  }
}

function enableButton(type) {
  if (type === "file") {
    BtnAddFile.disabled = false;
    BtnAddFile.style.opacity = "1";
    BtnAddFile.style.cursor = "pointer";
  } else {
    BtnAddFolder.disabled = "false";
    BtnAddFolder.style.opacity = "1";
    BtnAddFolder.style.cursor = "pointer";
  }
}
function toggleFiles(elementIdToBeClicked, elementIdTobeHidden) {
  elementIdToBeClicked.onclick = () => {
    toggleTab(elementIdTobeHidden);
  };
}

function createId() {
  return Math.random().toString(36).substr(2, 9);
}

function elemContainsId(divElem, uniqueId) {
  for (let i = 0; i < divElem.children.length; i++) {
    if (divElem.children[i].id === uniqueId) {
      return true; // The unique ID is found among the children
    }
  }
  return false; // The unique ID is not found
}
