const PENDING_TASKS = "PENDING";
const FINISHED_TASKS = "FINISHED";

const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  pendingUl = document.querySelector(".js-pending"),
  finishedUl = document.querySelector(".js-finished");

let pendingList = [],
  finishedList = [];

function saveTasks(type) {
  if (type === "pending") {
    localStorage.setItem(PENDING_TASKS, JSON.stringify(pendingList));
  } else {
    localStorage.setItem(FINISHED_TASKS, JSON.stringify(finishedList));
  }
}

function deleteTasks(event) {
  const li = event.target.parentNode;
  let type;
  console.log(li);

  if (li.classList.contains("pending")) {
    pendingUl.removeChild(li);
    const cleanTasks = pendingList.filter(function (task) {
      return task.id !== parseInt(li.id);
    });
    // console.log(`clean Task = ${cleanTasks}`);
    pendingList = cleanTasks;
    type = "pending";
  } else {
    finishedUl.removeChild(li);
    const cleanTasks = finishedList.filter(function (task) {
      return task.id !== parseInt(li.id);
    });
    finishedList = cleanTasks;
    console.log(finishedList);
    type = "finished";
  }

  console.log(event.target.parentNode);
  saveTasks(type);
}

function moveTasks(event) {
  const li = event.target.parentNode;
  if (li.classList.contains("pending")) {
    console.log(li.childNodes[0].innerText);
    paintTasks(li.childNodes[0].innerText, "finished");
  } else {
    console.log(li.childNodes[0].innerText);
    paintTasks(li.childNodes[0].innerText, "pending");
  }
  deleteTasks(event);
}

function paintTasks(text, type) {
  let targetUl = pendingUl,
    targetList = pendingList,
    actionBtnText = "✅";
  if (type !== "pending") {
    targetUl = finishedUl;
    targetList = finishedList;
    actionBtnText = "⏪";
  }
  console.log(`saveTasks : ${text}`);
  const newPending = document.createElement("li"),
    txtSpan = document.createElement("span"),
    deleteBtn = document.createElement("button"),
    finishBtn = document.createElement("button"),
    newId = new Date().getTime();

  txtSpan.innerHTML = text;
  deleteBtn.innerText = "❌";
  deleteBtn.addEventListener("click", deleteTasks);
  finishBtn.innerText = actionBtnText;
  finishBtn.addEventListener("click", moveTasks);

  newPending.append(txtSpan);
  newPending.append(deleteBtn);
  newPending.append(finishBtn);
  newPending.id = newId;
  newPending.classList.add(type);

  targetUl.appendChild(newPending);

  const tasksObj = {
    text: text,
    id: newId
  };
  targetList.push(tasksObj);

  saveTasks(type);
}

function handleSubmit(event) {
  event.preventDefault();
  const inputedText = toDoInput.value;
  paintTasks(inputedText, "pending");
  toDoInput.value = "";
}

function loadTasks() {
  const loadedPendingList = localStorage.getItem(PENDING_TASKS),
    loadedFinishedList = localStorage.getItem(FINISHED_TASKS);

  if (loadedPendingList !== null) {
    const loadedPendingListObj = JSON.parse(loadedPendingList);
    loadedPendingListObj.forEach(function (tasks) {
      paintTasks(tasks.text, "pending");
    });
  }
  if (loadedFinishedList !== null) {
    const loadedFinishedListObj = JSON.parse(loadedFinishedList);
    loadedFinishedListObj.forEach(function (tasks) {
      paintTasks(tasks.text, "finished");
    });
  }
}

function init() {
  loadTasks();
  toDoForm.addEventListener("submit", handleSubmit);
}
init();
