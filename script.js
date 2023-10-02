const table = document.getElementById("main-table");
const tHeadRow = document.getElementById("thead-row");
const tBody = document.getElementById("table-body");
const currentCellHeading = document.getElementById("current-cell-heading");

//button initialise
const boldButton = document.querySelector("#bold-btn");
const italicButton = document.querySelector("#italic-btn");
const underlineButton = document.querySelector("#underline-btn");
const centerButton = document.querySelector("#center-btn");
const leftButton = document.querySelector("#left-btn");
const rightButton = document.querySelector("#right-btn");
const cutButton = document.querySelector("#cut-btn");
const copyButton = document.querySelector("#copy-btn");
const pasteButton = document.querySelector("#paste-btn");
const downloadButton = document.querySelector("#download-btn");

const fontFamliyDropdown = document.getElementById("font-famliy-dropdown");
const fontSizeDropdown = document.getElementById("font-size-dropdown");
const bgColor = document.getElementById("bg-color");
const fontColor = document.getElementById("font-color");
const uploadInput = document.getElementById("upload-input");
//varaible
const COLs = 26;
const ROWs = 100;
let currentCell;
let previousCell;
let cutCell;
let matrix = new Array(ROWs);;
const transparent = "transparent";
const lightBlue = "#dddfff";

//addTableHead
function addTableHead(cellType, rowType, rowNum) {
  for (let i = 0; i < COLs; i++) {
    const cell = document.createElement(cellType);
    if (rowType == tHeadRow) {
      //String.fromCharCode => convert number into char(same ascii value)
      cell.innerText = String.fromCharCode(i + 65);
      cell.setAttribute("id", String.fromCharCode(i + 65));
    } else {
      cell.setAttribute("id", `${String.fromCharCode(i + 65)}${rowNum}`);
cell.addEventListener('focusout',updateMatrix)
      cell.setAttribute("contenteditable", true);
      cell.addEventListener("focus", (event) => focusCellID(event.target));
    }
    rowType.append(cell);
  }
}
addTableHead("th", tHeadRow);

//FocusCellHighlighter
function FocusCellHighlighter(colID, rowID, color) {
  // console.log(colID, rowID);
  const Col = document.getElementById(colID);
  const Row = document.getElementById(rowID);
  Row.style.backgroundColor = color;
  Col.style.backgroundColor = color;
}
// focusCell
function focusCellID(cell) {
  currentCell = cell;
  if (previousCell) {
    FocusCellHighlighter(
      previousCell.id[0],
      previousCell.id.substring(1),
      transparent
    );
  }

  function buttonStyle(btn, property, styling) {
    if (currentCell.style[property] == styling) {
      btn.style.backgroundColor = lightBlue;
    } else {
      btn.style.backgroundColor = transparent;
    }
  }
  buttonStyle(boldButton, "fontWeight", "bold");
  buttonStyle(italicButton, "fontStyle", "italic");
  buttonStyle(underlineButton, "textDecoration", "underline");

  FocusCellHighlighter(cell.id[0], cell.id.substring(1), lightBlue);
  currentCellHeading.innerText = `${cell.id} Selected`;
  previousCell = currentCell;
}

//addTableBody
function addTableBody() {
  for (let i = 1; i <= ROWs; i++) {
    const tr = document.createElement("tr");
    const th = document.createElement("th");
    th.innerText = i;
    th.setAttribute("id", i);
    tr.append(th);
    addTableHead("td", tr, i);
    tBody.append(tr);
  }
}
addTableBody();

//addTextStyle
function addTextStyle(btn, property, styling, defalt) {
  btn.addEventListener("click", () => {
    if (currentCell.style[property] == styling) {
      currentCell.style[property] = defalt;
      btn.style.backgroundColor = transparent;
    } else {
      currentCell.style[property] = styling;
      btn.style.backgroundColor = lightBlue;
    }
    updateMatrix();
  });
}
addTextStyle(boldButton, "fontWeight", "bold", "normal");
addTextStyle(italicButton, "fontStyle", "italic", "normal");
addTextStyle(underlineButton, "textDecoration", "underline", "none");

//addTextAlign
function addTextAlign(btn, styling) {
  btn.addEventListener("click", () => {
    currentCell.style.textAlign = styling;
    updateMatrix();
  });
}
addTextAlign(centerButton, "center");
addTextAlign(leftButton, "left");
addTextAlign(rightButton, "right");

//Dropdown and inputcolor
function addDropdownFunction(list, property) {
  list.addEventListener("input", () => {
    currentCell.style[property] = `${list.value}`;
    updateMatrix();
  });
}
addDropdownFunction(fontFamliyDropdown, "fontFamily");
addDropdownFunction(fontSizeDropdown, "fontSize");
addDropdownFunction(bgColor, "backgroundColor");
addDropdownFunction(fontColor, "color");

//cut copy

function addCutCopy(Btn, typeofBtn) {
  Btn.addEventListener("click", () => {
    cutCell = {
      text: currentCell.innerText,
      style: currentCell.style.cssText,
      btn: "cut",
    };
    if (typeofBtn === "cut") currentCell.innerText = "";
    currentCell.style.cssText = "";
    updateMatrix();
  });
}
addCutCopy(cutButton, "cut");
addCutCopy(copyButton, "copy");

//paste
pasteButton.addEventListener("click", () => {
  currentCell.innerText = cutCell.text;
  currentCell.style = cutCell.style;
  if (cutCell.btn === "cut") {
    cutCell = undefined;
  }
  updateMatrix()
});


//creatematrix virtual sheet
function createMatrix(){
  for (let row = 0; row < ROWs; row++) {
    matrix[row] = new Array(COLs);
    for (let col = 0; col < COLs; col++) {
      matrix[row][col] = {};
    }
  }
  // console.log(matrix);
}
createMatrix();

//updateMatrix
function updateMatrix(){
 let id = currentCell.id;
 let row = id.substring(1);
 let col = id[0].charCodeAt(0) - 65;
//  console.log(row,col);
matrix[row][col] = {
  text: currentCell.innerText,
  style: currentCell.style.cssText,
  id: id
}
// console.log(matrix[row][col]);
}

//downloadMatrix
function downloadMatrix(){
  const matrixString = JSON.stringify(matrix);
  const blob = new Blob([matrixString],{type : 'application/json'});
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'table.json';
  link.click()
}
downloadButton.addEventListener('click', downloadMatrix);

//uploadMatrix
function uploadMatrix(event){
  const file = event.target.files[0];
  if (file) {
    let reader = new FileReader();
    reader.readAsText(file);
    reader.onload = function(event){
      const fileContent = JSON.parse(event.target.result);
    }
  }
}
uploadInput.addEventListener('input',uploadMatrix);