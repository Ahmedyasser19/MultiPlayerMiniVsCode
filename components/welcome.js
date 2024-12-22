import { idWelcome, BtnAddFile, idFiles, idEditor } from "../util/ref.js";
export default function Welcome() {
  idWelcome.onclick = (e) => {
    e.preventDefault();
    BtnAddFile.click();
  };

  idFiles.addEventListener("click", () => {
    if (idFiles.childElementCount >= 1) {
      idWelcome.classList.add("hide");
      idEditor.classList.remove("hide");
    }
  });
}

/* <div
id="editor"
class="widthFull heighthalf overflowHidden"
>
<!-- Taps -->
<div
  class="flex flexRow noSelect"
  id="taps"
></div>
<!-- Editor -->
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
    class="scroll"
    contenteditable="true"
  ></p>
</div>
</div> */
