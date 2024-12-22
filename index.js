console.log("js loading");
import { app } from "./util/dom.js";
import TopBar from "./components/topBar/TopBar.js";
import Explorer from "./components/explorer/Explorer.js";
import Ruler from "./components/ruler/Ruler.js";
import Welcome from "./components/welcome.js";

Welcome();
TopBar();
Explorer();
Ruler();

//   // Style code editor
//   codeEditor.classList.add("code-editor", "border");
//   codeEditor.setAttribute("contenteditable", "true");

//   // Highlight initial content
//   const initialCode = question?.answer || "";
//   const highlightedCode = highlightSyntax(initialCode);
//   codeEditor.innerHTML = highlightedCode;

//   // Add to DOM
//   main.appendChild(parent);
//   parent.appendChild(text);
//   parent.appendChild(codeEditor);
//   parent.appendChild(buttonsDiv);
//   buttonsDiv.appendChild(formatButton);
//   buttonsDiv.appendChild(copyButton);
//   buttonsDiv.appendChild(runButton);
//   parent.appendChild(preCodeOutput);
//   parent.appendChild(outputDiv);
//   outputDiv.appendChild(codeOutput);
//   outputDiv.appendChild(codeError);

//   // Syntax highlighting logic
//   codeEditor.addEventListener("input", () => {
//     const code = codeEditor.innerText;
//     const highlightedCode = highlightSyntax(code);
//     codeEditor.innerHTML = highlightedCode;
//     placeCaretAtEnd(codeEditor);
//   });

//   // Run button logic
//   runButton.addEventListener("click", (e) => {
//     e.preventDefault();
//     codeError.textContent = " ";
//     codeOutput.textContent = " ";
//     runButton.classList.remove("Error", "Success");

//     try {
//       const code = codeEditor.innerText;
//       if (code === "") {
//         codeError.textContent = "Please enter code before running";
//         runButton.classList.add("Error");
//       } else {
//         const output = eval(code);
//         runButton.classList.add("Success");
//         codeOutput.innerHTML = output;
//       }
//     } catch (error) {
//       runButton.classList.add("Error");
//       codeError.textContent = error.message;
//     }
//   });

//   // Format button logic
//   formatButton.addEventListener("click", (e) => {
//     e.preventDefault();
//     const code = codeEditor.innerText;
//     const formattedCode = formatCode(code);
//     const highlightedCode = highlightSyntax(formattedCode);
//     codeEditor.innerHTML = highlightedCode;
//     placeCaretAtEnd(codeEditor);
//   });

//   // Copy button logic
//   copyButton.addEventListener("click", (e) => {
//     e.preventDefault();
//     const code = codeEditor.innerText;
//     navigator.clipboard.writeText(code);
//     copyButton.innerText = "Copied";
//     setTimeout(() => {
//       copyButton.innerText = "Copy";
//     }, 1000);
//   });

// function highlightSyntax(code) {
//   const keywords =
//     /\b(function|const|let|var|return|if|else|try|catch|for|while)\b/g;
//   const strings = /("[^"]*"|'[^']*'|`[^`]*`)/g;
//   const numbers = /\b(\d+)\b/g;

//   return code
//     .replace(strings, '<span class="string">$&</span>')
//     .replace(keywords, '<span class="keyword">$&</span>')
//     .replace(numbers, '<span class="number">$&</span>');
// }

// // todo: fix bug where caret is not placed at end of code
// // get cart current location then return it
// function placeCaretAtEnd(el) {
//   const range = document.createRange();
//   const sel = window.getSelection();
//   range.selectNodeContents(el);
//   range.collapse(false);
//   sel.removeAllRanges();
//   sel.addRange(range);
// }
