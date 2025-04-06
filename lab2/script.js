"use strict";

let deletedTask = null;
const lists = {};


function createList(name) {
  if (!lists[name]) {
    lists[name] = [];
    const option = document.createElement("option");
    option.value = name;
    option.textContent = name;
    listSelector.appendChild(option);
    renderLists();
  }
}

function renderLists() {
  listsContainer.innerHTML = "";
  Object.keys(lists).forEach((listName) => {
    const wrapper = document.createElement("div");
    wrapper.className = "mb-4";

    const header = document.createElement("h3");
    header.className = "cursor-pointer bg-success text-white p-2 rounded";
    header.textContent = listName;
    header.style.cursor = "pointer";
    let visible = true;

    header.addEventListener("click", () => {
      visible = !visible;
      ul.style.display = visible ? "block" : "none";
    });

    const ul = document.createElement("ul");
    ul.className = "list-group";

    const searchTerm = searchInput.value.trim();
    const sensitive = caseSensitive.checked;

    lists[listName].forEach((task) => {
      const match = sensitive
        ? task.text.includes(searchTerm)
        : task.text.toLowerCase().includes(searchTerm.toLowerCase());
      if (match) {
        const li = document.createElement("li");
        li.className =
          "list-group-item d-flex justify-content-between align-items-center";

        if (task.done) {
          li.classList.add("text-muted", "text-decoration-line-through");
          li.innerHTML = `<span>${task.text} <small class='text-end d-block'>(${task.doneDate})</small></span>`;
        } else {
          li.textContent = task.text;
        }

        li.addEventListener("click", () => toggleDone(task));

        const delBtn = document.createElement("button");
        delBtn.className = "btn btn-sm btn-danger ms-2";
        delBtn.textContent = "X";
        delBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          modalText.textContent = `Czy na pewno chcesz usunąć zadanie o treści: ${task.text}`;
          showModal();
          confirmDelete.onclick = () => {
            deletedTask = { ...task, listName };
            lists[listName] = lists[listName].filter((t) => t !== task);
            renderLists();
            hideModal();
          };
          cancelDelete.onclick = () => {
            hideModal();
          };
        });

        li.appendChild(delBtn);
        ul.appendChild(li);
      }
    });

    wrapper.appendChild(header);
    wrapper.appendChild(ul);
    listsContainer.appendChild(wrapper);
  });
}

function toggleDone(task) {
  task.done = !task.done;
  task.doneDate = task.done ? new Date().toLocaleString() : null;
  renderLists();
}

function showModal() {
  deleteModal.style.display = "block";
}

function hideModal() {
  deleteModal.style.display = "none";
}

addTaskBtn.addEventListener("click", () => {
  const text = taskInput.value.trim();
  if (text) {
    if (!lists[listSelector.value]) {
      createList(listSelector.value);
    }
    lists[listSelector.value].push({ text, done: false, doneDate: null });
    taskInput.value = "";
    renderLists();
  }
});

addListBtn.addEventListener("click", () => {
  const name = newListName.value.trim();
  if (name && !lists[name]) {
    createList(name);
    listSelector.value = name;
    newListName.value = "";
  }
});

searchInput.addEventListener("input", renderLists);
caseSensitive.addEventListener("change", renderLists);

document.addEventListener("keydown", (e) => {
  if (e.ctrlKey && e.key === "z" && deletedTask) {
    e.preventDefault();
    lists[deletedTask.listName].push({
      text: deletedTask.text,
      done: deletedTask.done,
      doneDate: deletedTask.doneDate,
    });
    deletedTask = null;
    renderLists();
  }
});

createList("Główna");
createList("Mało pilne");
createList("Pilne");
createList("Na wczoraj");
listSelector.value = "Główna";
renderLists();
