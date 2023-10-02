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
const fontFamliyDropdown = document.getElementById('font-famliy-dropdown');
const fontSizeDropdown = document.getElementById('font-size-dropdown');
const bgColor = document.getElementById('bg-color');
const fontColor = document.getElementById('font-color');
//varaible
const COLs = 26;
const ROWs = 100;
let currentCell;
let previousCell;
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
function addTextStyle(btn,property,styling,defalt){
  btn.addEventListener("click", () => {
    if(currentCell.style[property] == styling)
     {
      currentCell.style[property] = defalt;
     btn.style.backgroundColor = transparent;
    }else{
      currentCell.style[property] = styling;
     btn.style.backgroundColor = lightBlue;
    }
  })
}
addTextStyle(boldButton, "fontWeight", "bold",'normal');
addTextStyle(italicButton, "fontStyle", "italic",'normal');
addTextStyle(underlineButton, "textDecoration", "underline",'none');

//addTextAlign
function addTextAlign(btn,styling){
  btn.addEventListener('click', () => {
    currentCell.style.textAlign = styling
  })
}
addTextAlign(centerButton,'center');
addTextAlign(leftButton,'left');
addTextAlign(rightButton,'right');

//Dropdown and inputcolor
function addDropdownFunction(list,property){
  list.addEventListener('input',() => {
    currentCell.style[property] = `${list.value}`;
  })

}
addDropdownFunction(fontFamliyDropdown,'fontFamily');
addDropdownFunction(fontSizeDropdown,'fontSize');
addDropdownFunction(bgColor,'backgroundColor');
addDropdownFunction(fontColor,'color');
