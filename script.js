
const formBookmark = document.getElementById('bookmarkForm')
const titleInput = document.getElementById('title')
const urlInput = document.getElementById('url')
const bookmarkList = document.getElementById('bookmarkList')

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