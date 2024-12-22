import { addToDom, createElement } from "../../../util/shared.js";
import Editor from "../Editor.js";
import { idEditor, idTaps, idWelcome, idNoteBook } from "../../../util/ref.js";
export default function Tap([name, img, closeImg, uniqueId]) {
  const divParent = createElement("div");
  const imgExt = createElement("img");
  const pName = createElement("p");
  const btn = createElement("button");
  const imgClose = createElement("img");

  imgExt.setAttribute("src", img);
  divParent.classList.add("tab", "flex", "flexRow", "alignCenter");
  divParent.id = uniqueId;
  imgExt.classList.add("logo");

  pName.textContent = name;
  btn.classList.add("hover");
  imgClose.setAttribute("src", closeImg);

  //delete functionality
  btn.onclick = () => {
    divParent.remove();
    //if no taps opened redisplay the home screen
    if (idTaps.childElementCount === 0) {
      idWelcome.classList.remove("hide");
      idEditor.classList.add("hide");
    }
  };

  idTaps.appendChild(divParent);
  divParent.appendChild(imgExt);
  divParent.appendChild(pName);
  divParent.appendChild(btn);
  btn.appendChild(imgClose);

  //when tab is created create editor
  const editor = new Editor(uniqueId);
  addToDom(idNoteBook, editor);
}

{
  /* <div class="tab flex flexRow alignCenter">
<img
  src="./components/svg/html.svg"
  class="logo"
/>
<p>index.html</p>
<button class="hover">
  <img
    src="./components/svg/close.svg"
    alt=""
  />
</button>
</div> */
}
