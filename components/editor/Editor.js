import { addToDom, createElement } from "../../util/shared.js";
import { idNoteBook, idLineCounter } from "../../util/ref.js";

//editor should retrun a div containting the id given by the constructor
export default class Editor {
  constructor(id) {
    this.counter = 1;
    this.currentLine = 1;
    return this.init(id);
  }
  //creates the line counter html
  createLineCoutner() {
    const lineCounterDiv = document.createElement("div");
    lineCounterDiv.setAttribute("id", "lineCounter");
    const pTag = document.createElement("p");
    pTag.classList.add("counter");
    pTag.textContent = `${this.counter++} `;
    lineCounterDiv.appendChild(pTag);
    return lineCounterDiv;
  }

  addCounter(parent) {
    const pTag = document.createElement("p");
    pTag.classList.add("counter");
    pTag.textContent = `${this.counter++} `;
    this.currentLine++;
    addToDom(parent, pTag);
  }
  removeCounter(parent, innerHTML) {
    const pTag = parent.querySelector(".counter:last-child");

    pTag.remove();
    this.counter--;
    this.currentLine--;
  }
  //creates the code editor html
  createCodeEditor() {
    const codeEditor = document.createElement("p");
    codeEditor.classList.add("scroll");
    codeEditor.setAttribute("id", "editorCode");
    codeEditor.setAttribute("contenteditable", true);

    codeEditor.addEventListener("input", (e) => {
      this.handleText(e);
    });
    codeEditor.addEventListener("keydown", (e) => {
      let parentDiv = codeEditor.parentElement.querySelector("#lineCounter");

      if (e.key === "Enter") {
        this.addCounter(parentDiv);
      } else if (e.key === "Backspace" || e.key === "Delete") {
        this.removeCounter(parentDiv, e.target.innerHTML);
      }
    });

    return codeEditor;
  }

  handleText(e) {
    // getting code from the editor
    const code = e.target.textContent;

    // case when user enters new line
    //case when user deletes a line
    //syntux highlighting

    // add the cursor to the postion where it was before the user entered a new character
  }

  syntaxHighlight() {}

  init(id) {
    let parentDiv = document.createElement("div");
    parentDiv.setAttribute("id", id);
    parentDiv.classList.add("editor", "flex", "flexRow", "scroll");

    const LineCoutner = this.createLineCoutner();
    const CodeEditor = this.createCodeEditor();

    parentDiv.appendChild(LineCoutner);
    parentDiv.appendChild(CodeEditor);
    return parentDiv;
  }
}

// when user press enter add new line number and increase count +1

// each file content is saved in a seperate variable
// if the content of the tab is not saved, show a dot in the tab
// when saving a file, we will save in local storage
// when saved to local storage, save project name with the files

// when loading a file, we will load from local storage based on its id
{
  /*
   <div class="editor flex flexRow scroll">
<div id="lineCounter">
  <p class="counter">1</p>
  <p class="counter">1</p>
  <p class="counter">1</p>
  <p class="counter">1</p>
  <p class="counter">1</p>
  <p class="counter">1</p>
</div>

<p
  id="editorCode"
  contenteditable="true"
></p>
</div> */
}
