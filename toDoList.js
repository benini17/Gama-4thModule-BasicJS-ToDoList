let listContainer = document.querySelector(`[data-lists]`);
let newListForm = document.querySelector(`[data-new-list-form]`);
let newListInput = document.querySelector('[data-new-list-input]');

let currentInnerText = null;
let lists = [];

newListForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const listName = newListInput.value;
  if (listName === null || listName === '') {
    return;
  }

  const list = createList(listName);
  newListInput.value = null;
  lists.push(list);
  render();
});

function createList(name) {
  return { id: Date.now().toString(), name: name };
}

function render() {
  console.log(lists);
  clearElement(listContainer);

  lists.forEach(function (list) {
    const toDoDiv = document.createElement('div');
    toDoDiv.classList.add('toDo');
    listContainer.appendChild(toDoDiv);

    const deleteBtn = document.createElement('button');
    deleteBtn.innerHTML = `<i class="fas fa-trash"></i>`;
    deleteBtn.classList.add('deleteBtn');
    toDoDiv.appendChild(deleteBtn);

    const checkBox = document.createElement('button');
    checkBox.innerHTML = `<i class="fas fa-check-square"></i>`;
    checkBox.classList.add('checkBox');
    toDoDiv.appendChild(checkBox);

    const item = document.createElement('li');
    item.classList.add('item');
    item.contentEditable = 'true';
    toDoDiv.appendChild(item);
    item.innerHTML = list.name;
  });
}

function clearElement(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

listContainer.addEventListener('focusout', eventCall);
listContainer.addEventListener('keyup', eventCall);

function eventCall(event) {
  console.log(`captura de evento -`, event);
  let newValue = event.target.innerText.replace(/(\r\n|\n|\r)/gm, '');

  if (event.type == 'focusout') {
    newListInput.focus();
    callForEach(newValue);
  }
  if (event.keyCode === 13 || event.key === 'Enter') {
    event.preventDefault();
    newListInput.focus();
    callForEach(newValue);
  }
}

listContainer.addEventListener('click', (e) => {
  let item = e.target;
  console.log('item', item);

  if (item.classList[0] === 'deleteBtn') {
    const toDoDiv = item.parentElement;
    toDoDiv.classList.add('fall');
    toDoDiv.addEventListener('transitionend', () => {
      lists.forEach((list) => {
        if (item.parentElement.lastElementChild.innerHTML === list.name) {
          const index = lists.indexOf(list.name);
          lists.splice(index, 1);
          render();
        }
      });
    });
  }

  if (item.classList[0] === 'checkBox') {
    const checked = item.parentElement;
    checked.classList.toggle('completed');
  }

  if (item.classList[0] === 'item') {
    currentInnerText = [item.innerText];
    console.log('currentInnerText', currentInnerText);
  }
});

function callForEach(newValue) {
  console.log('callForEach -> newValue', newValue);

  console.log(currentInnerText);
  lists.forEach((list) => {
    console.log(list.name);

    if (currentInnerText[0] == list.name) {
      list.name = newValue;
      console.log(`Change words - ${list.name}`);
      render();
    }
  });
}
render();
