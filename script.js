const draggable_list = document.getElementById('draggable-list')
const check = document.getElementById('check')

const languages = [
  'Python',
  'JavaScript',
  'Go',
  'Java',
  'C/C++',
  'C#',
  'R',
  'Ruby',
  'Kotlin',
  'Swift',
]

// Store list items
const listItems = [];

let dragStartIndex;

createList()

// Insert list items into DOM
function createList() {
  ;[...languages]
    .map((lang) => ({ value: lang, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map((a) => a.value)
    .forEach((language, index) => {
      const listItem = document.createElement('li')

      listItem.setAttribute('data-index', index)

      listItem.innerHTML = `
        <span class="number">${index + 1}</span>
        <div class="draggable" draggable='true'>
          <p class='language-name'>${language}</p>
          <i class='fas fa-grip-lines'></i>
        </div>
      `

      listItems.push(listItem)

      draggable_list.appendChild(listItem)
    })

  addEventListeners()
}

// Swap list items that are dragged and dropped
function swapItems(fromIndex, toIndex) {
  // Getting the items of fromIndex and toIndex
  const itemOne = listItems[fromIndex].querySelector('.draggable')
  const itemTwo = listItems[toIndex].querySelector('.draggable')

  listItems[fromIndex].appendChild(itemTwo);
  listItems[toIndex].appendChild(itemOne);
}

function dragStart() {
  // console.log('Event: ', 'dragstart');
  dragStartIndex = +this.closest('li').getAttribute('data-index');
}

function dragOver(e) {
  // dragOver event is in the middle of the dragStart and the dragDrop, and prevent the dragDrop function from working, so need to prevent the default action
  e.preventDefault();
}

function dragDrop() {
  // console.log('Event: ', 'drop')
  const dragEndIndex = +this.getAttribute('data-index');

  swapItems(dragStartIndex, dragEndIndex);

  this.classList.remove('over')

}

function dragEnter() {
  // console.log('Event: ', 'dragenter')
  this.classList.add('over');
}

function dragLeave() {
  // console.log('Event: ', 'dragleave')
  this.classList.remove('over')
}

// Evaluate the order of list items
function checkOrder() {
  listItems.forEach((listItem, index) => {
    const langName = listItem.querySelector('.draggable').innerText.trim();

    if (langName != languages[index]) {
      listItem.classList.remove('right');
      listItem.classList.add('wrong');
    } else {
      listItem.classList.remove('wrong');
      listItem.classList.add('right');
    }
  });
}

function addEventListeners() {
  const draggables = document.querySelectorAll('.draggable')
  const draglistItems = document.querySelectorAll('.draggable-list li')

  draggables.forEach((draggable) => {
    draggable.addEventListener('dragstart', dragStart)
  })

  draglistItems.forEach((item) => {
    item.addEventListener('dragover', dragOver)
    item.addEventListener('drop', dragDrop)
    item.addEventListener('dragenter', dragEnter)
    item.addEventListener('dragleave', dragLeave)
  })
}

check.addEventListener('click', checkOrder);
