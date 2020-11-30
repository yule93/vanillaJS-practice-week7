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

function sendPending(event) {
  const checkBtn = event.target;
  const li = checkBtn.parentNode;
  // li 내 span의 text값을 가져와 "finished" 목록에 저장
  const text = li.querySelector("span").innerText;
  pdList.removeChild(li);
  paintFinished(text);
  // localStorage의 pending의 list 상태를 저장하는 함수 적용
  const cleanPendings = pendings.filter(function (pending) {
    return pending.id !== parseInt(li.id);
  });
  pendings = cleanPendings;
  savePending();
}
function deletePending(event) {
  const delBtn = event.target;
  const li = delBtn.parentNode;
  pdList.removeChild(li);
  // localStorage의 pending의 list 상태를 저장하는 함수 적용
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
  finBtn.addEventListener("click", sendPending);
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

function sendFinished(event) {
  // 되감기 버튼 클릭 시 pending에 다시 재전송 하는 함수
  const backBtn = event.target;
  const li = backBtn.parentNode;
  // li 내 span의 text값을 가져와 "pending" 목록에 저장
  const text = li.querySelector("span").innerText;
  fnList.removeChild(li);
  paintPending(text); // pending 리스트에 다시 보내는 함수
  // localStorage의 finished의 list 상태를 저장하는 함수 적용
  const cleanFinisheds = finisheds.filter(function (finished) {
    return finished.id !== parseInt(li.id);
  });
  finisheds = cleanFinisheds;
  saveFinished();
}
function deleteFinished(event) {
  const delBtn = event.target;
  const li = delBtn.parentNode;
  fnList.removeChild(li);
  const cleanFinisheds = finisheds.filter(function (finished) {
    return finished.id !== parseInt(li.id);
  });
  finisheds = cleanFinisheds;
  saveFinished();
}
function paintFinished(text) {
  const finishedLi = document.createElement("li");
  const delBtn = document.createElement("button");
  const rollbackBtn = document.createElement("button");
  const span = document.createElement("span");
  const newID = finisheds.length + 1;
  delBtn.value = "❌";
  delBtn.addEventListener("click", deleteFinished);
  rollbackBtn.value = "⏪";
  rollbackBtn.addEventListener("click", sendFinished);
  span.innerText = text;
  finishedLi.appendChild(span);
  finishedLi.appendChild(delBtn);
  finishedLi.appendChild(rollbackBtn);
  finishedLi.id = newID;
  fnList.appendChild(finishedLi);

  const finishedObj = {
    text: text,
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
    const parsedFinished = JSON.parse(loadedFinished);
    parsedFinished.forEach(function (finished) {
      paintFinished(finished);
    });
  }
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = pendingInputBox.value;
  paintPending(currentValue);
  pendingInputBox.value = "";
}

function init() {
  loadPending();
  loadFinished();
  pendingForm.addEventListener("submit", handleSubmit);
}

init();
