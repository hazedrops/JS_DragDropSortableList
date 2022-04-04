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
const listItems = []

let dragStartIndex

createList()

// Insert list items into DOM
function createList() {
  ;[...languages]
    .map((lang) => ({ value: lang, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(a => a.value)
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
}
