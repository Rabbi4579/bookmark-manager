
const formBookmark = document.getElementById('bookmarkForm')
const titleInput = document.getElementById('title')
const urlInput = document.getElementById('url')
const bookmarkList = document.getElementById('bookmarkList')
const toggleBtn = document.getElementById('toggleTheme')

const bookmarks = [];


window.addEventListener('DOMContentLoaded', loadBooksFromLocalStorage)

function loadBooksFromLocalStorage(){
    const books = JSON.parse(localStorage.getItem('books') || '[]' )
    bookmarks.push(...books)
    renderBookmarks()
}

formBookmark.addEventListener('submit', (e) =>{
    e.preventDefault()
    const title = titleInput.value.trim();
    const url = urlInput.value.trim()
    if(!title || !url) return;
    bookmarks.push({title, url});
    renderBookmarks()
    savedTolocalStorage()

    titleInput.value = '';
    urlInput.value = '';
    // console.log(bookmarks)
})


function renderBookmarks (){
    bookmarkList.innerHTML = ''
    bookmarks.forEach((bookmark, index) =>{
        const li = document.createElement('li');
        li.innerHTML = `
        
        <strong>${bookmark.title}</strong>
        (<a href="${bookmark.url}" target="_blank"> Visit </a>)
        <button data-index = ${index}> Delete </button>
        `
        bookmarkList.appendChild(li)
    })

}


bookmarkList.addEventListener('click', (e) =>{
    if(e.target.tagName === 'BUTTON'){
        const index = e.target.getAttribute('data-index');
        bookmarks.splice(index, 1)
        renderBookmarks()
        savedTolocalStorage()
    }
})


function savedTolocalStorage(){
    localStorage.setItem("books", JSON.stringify(bookmarks))
}


// toggle list and dark theme

window.addEventListener('DOMContentLoaded', () =>{
    const saved = localStorage.getItem('theme');
    displayTheme(saved)
})

toggleBtn.addEventListener('click', () =>{
    const currentThme = document.body.classList.contains('dark') ? 'dark' : 'light';
    const newTheme = currentThme === 'light' ? 'dark' : 'light';
    displayTheme(newTheme)
})

function displayTheme(theme){
    document.body.classList.remove('light', 'dark');
    document.body.classList.add(theme)
    localStorage.setItem('theme', theme)
}