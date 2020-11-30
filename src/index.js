// <⚠️ DONT DELETE THIS ⚠️>
import "./styles.css";
// <⚠️ /DONT DELETE THIS ⚠️>
const PD_LS = "pendings";
const FN_LS = "finisheds";

const pendingForm = document.querySelector(".js-form");
const pendingInputBox = pendingForm.querySelector("input");
const pdList = document.querySelector(".js-pendingList");
const fnList = document.querySelector(".js-finishedList");

let pendings = [];
let finisheds = [];

// 이하는 pending 관련 함수

function deletePending(event) {
  const delBtn = event.target;
  const li = delBtn.parentNode;
  pdList.removeChild(li);
  const cleanPendings = pendings.filter(function (pending) {
    return pending.id !== parseInt(li.id);
  });
  pendings = cleanPendings;
  savePending();
}
function paintPending(text) {
  const pendingLi = document.createElement("li");
  const delBtn = document.createElement("button");
  const finBtn = document.createElement("button");
  const span = document.createElement("span");
  const newID = pendings.length + 1;
  delBtn.value = "❌";
  delBtn.addEventListener("click", deletePending);
  finBtn.value = "✔";
  finBtn.addEventListener("click", deletePending);
  finBtn.addEventListener("click", paintFinished);
  span.innerText = text;
  pendingLi.appendChild(span);
  pendingLi.appendChild(delBtn);
  pendingLi.appendChild(finBtn);
  pendingLi.id = newID;
  pdList.appendChild(pendingLi);

  const pendingObj = {
    text: text,
    id: newID
  };
  pendings.push(pendingObj);
  savePending();
}
function savePending() {
  localStorage.setItem(PD_LS, JSON.stringify(pendings));
}
function loadPending() {
  const loadedPending = localStorage.getItem(PD_LS);
  if (loadedPending !== null) {
    const parsedPending = JSON.parse(loadedPending);
    parsedPending.forEach(function (pending) {
      paintPending(pending);
    });
  }
}

// 이하는 finished 관련 함수

function deleteFinished(event) {
  const delBtn = event.target;
  const li = delBtn.parentNode;
  fnList.removeChild(li);
  const cleanFinisheds = pendings.filter(function (finished) {
    return finished.id !== parseInt(li.id);
  });
  finisheds = cleanFinisheds;
  savePending();
}
function paintFinished() {
  const finishedLi = document.createElement("li");
  const delBtn = document.createElement("button");
  const rollbackBtn = document.createElement("button");
  const span = document.createElement("span");
  const newID = finisheds.length + 1;
  delBtn.value = "❌";
  delBtn.addEventListener("click", deleteFinished);
  rollbackBtn.value = "⏪";
  span.innerText = "";
  finishedLi.appendChild(span);
  finishedLi.appendChild(delBtn);
  finishedLi.appendChild(rollbackBtn);
  finishedLi.id = newID;
  pdList.appendChild(finishedLi);

  const finishedObj = {
    text: "",
    id: newID
  };
  finisheds.push(finishedObj);
  saveFinished();
}
function saveFinished() {
  localStorage.setItem(FN_LS, JSON.stringify(finisheds));
}
function loadFinished() {
  const loadedFinished = localStorage.getItem(FN_LS);
  if (loadedFinished !== null) {
  }
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = pendingInputBox.value;
  paintPending(currentValue);
  paintFinished();
  pendingInputBox.value = "";
}

function init() {
  loadPending();
  loadFinished();
  pendingForm.addEventListener("submit", handleSubmit);
}

init();
