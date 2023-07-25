// variables

let input = document.querySelector("#input");
let addTask = document.querySelector("#addTask");
let listGroup = document.querySelector(".list-group");
let alertDiv = document.querySelector(".myAlert");

// Alert Companent

function myAlert(message) {
  return `<div class="alert alert-warning alert-dismissible fade show" role="alert">
    <strong>Holy guacamole!</strong> ${message}
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  </div>`;
}

// loadItems;

function loadItems() {
  taskArray = getItemsFromLs();
  taskArray.forEach(function (item) {
    createItem(item);
  });
}

// createItem

function createItem(inputValue) {
  let li = document.createElement("li");
  li.classList.add(
    "list-group-item",
    "d-flex",
    "justify-content-between",
    "align-items-center",
    "my-2",
    "p-3",
    "fs-4"
  );

  li.innerText = inputValue;

  let div = document.createElement("div");
  div.innerHTML = ` 
    <i class="fa-solid fa-trash me-2"></i>
    <i class="fa-solid fa-pencil"></i>  
    `;

  li.appendChild(div);

  listGroup.append(li);
}

// Array for Local Storage

let taskArray;
// saveLocalStorage

function getItemsFromLs(value) {
  if (localStorage.getItem("tasks") === null) {
    taskArray = [];
  } else {
    taskArray = JSON.parse(localStorage.getItem("tasks"));
  }
  return taskArray;
}

// set Item Local Storage

function setItemToLs(value) {
  taskArray = getItemsFromLs();
  taskArray.push(value);
  localStorage.setItem("tasks", JSON.stringify(taskArray));
}

// Delete Item Local Storage

function deleteItemFromLocalStorage(value) {
  taskArray = getItemsFromLs();
  taskArray.forEach(function (item, index) {
    if (value.includes(item)) {
      taskArray.splice(index, 1);
    }
  });
  localStorage.setItem("tasks", JSON.stringify(taskArray));
}

// Add Task Event Listener

addTask.addEventListener("click", function () {
  let inputValue = input.value;

  if (input.value === "") {
    alertDiv.innerHTML = myAlert("Lütfen Boş bilgi girmeyiniz");
  } else {
    createItem(inputValue);
    setItemToLs(inputValue);
    input.value = "";
  }
});

// delete and Edit

listGroup.addEventListener("click", function (e) {
  let target = e;

  // delete
  if (e.target.className === "fa-solid fa-trash me-2") {
    if (confirm("onaylıyor musun")) {
      e.target.parentNode.parentNode.remove();

      // delete Local Storage
      deleteItemFromLocalStorage(e.target.parentNode.parentNode.innerText);
      console.log(e.target.parentNode.parentNode.textContent);
    }
  }

  // choose
  if (e.target.classList[0] === "list-group-item") {
    e.target.classList.toggle("text-decoration-line-through");
    e.target.classList.toggle("bg-hover");
  }

  //   edit
  else if (e.target.className === "fa-solid fa-pencil") {
    const modal = document.getElementById("staticBackdrop");
    const modalObj = new bootstrap.Modal(modal, {
      backdrop: "static",
    });

    if (modal) {
      e.target.addEventListener("click", function () {
        modalObj.show();

        let saveBtn = document.querySelector("#saveModal");
        let close = document.querySelector(".btn-close");
        close.addEventListener("click", function () {
          modalObj.hide();
        });
        let closeOther = document.querySelector("#close");
        closeOther.addEventListener("click", function () {
          modalObj.hide();
        });
        saveBtn.addEventListener("click", function () {
          let input = document.querySelector("#modalInput");
          let inputValueSetLS = input.value;
          
            function edit(text) {
              let taskArray = getItemsFromLs();
              taskArray.forEach(function (item, index) {
                if (text.innerText.includes(item)) {
                  // taskArray.splice(index, 1);

                  taskArray[index] = inputValueSetLS;

                  // setItemToLs(inputValueSetLS);
                }
              });
              localStorage.setItem("tasks", JSON.stringify(taskArray));
              console.log("text", text.innerText.includes(1));
            }

            edit(target.target.parentNode.parentNode);

            target.target.parentNode.parentNode.innerHTML = `
              ${inputValueSetLS}
              <div>
                <i class="fa-solid fa-trash me-2"></i>
                <i class="fa-solid fa-pencil"></i>
              </div>
            `;

            input.value = "";

            modalObj.hide();

        });
      });
    }
  }
});

// thema

let dark = document.querySelector(".dark");
let light = document.querySelector(".light");

dark.addEventListener("click", function (e) {
  e.stopPropagation();

  let body = document.querySelector("body");
  body.classList.remove("bg-one");
  body.classList.add("bg-two");
  console.log("click");

  let h1 = document.querySelector("h1");

  h1.className = "display-2 text-dark";
});

light.addEventListener("click", function (e) {
  e.stopPropagation();

  let body = document.querySelector("body");
  body.classList.remove("bg-two");
  body.classList.add("bg-one");
  console.log("click");

  let h1 = document.querySelector("h1");

  h1.className = "display-2 text-white-50";
});

// loadItems
loadItems();
