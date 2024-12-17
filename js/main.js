const API_KEY = '48d542367c38600f38038fbab6cf0b0e'
let page=1;
const API_URL = () => `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&page=${page}`
const API_IMAGE_URL = "https://image.tmdb.org/t/p/w1280"
const API_SEARCH_URL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=`


async function getMovies(url) {
    const res = await fetch(url)
    const data = await res.json()
    ShowMovies(data.results)
}

function nextPage() {
    if(page >= 1) {
        page += 1;
        getMovies(API_URL())
        updatePage()
    }
}

function updatePage() {
    getMovies(API_URL())
    currentPage.innerHTML = page
}

function prevPage() {
    if (page > 1) { 
        page -= 1;
        getMovies(API_URL())
        updatePage()
    }
}

next.addEventListener("click", () => {
    nextPage();
})

prev.addEventListener("click", () => {
    prevPage();
})

function ShowMovies(movies) {
    moviesElement.innerHTML = ''
    movies.forEach(movie => {
        const {title, poster_path, overview} = movie
        const movieCard = document.createElement("div")
        movieCard.classList.add("movie")

        movieCard.innerHTML = `
        <img src="${API_IMAGE_URL + poster_path}" alt="Movie Photos"/>
        <div class="detail">
            <h4>${title}</h4>
            <p>${overview.substring(0,100)}. . .</p>
        </div>
        `
        moviesElement.appendChild(movieCard)
    });
}

searchForm.addEventListener("submit", (event) => {
    event.preventDefault()
    const searchQuery = search.value
    if (searchQuery !== '') {
        getMovies(API_SEARCH_URL + searchQuery)

        search.value = ''
    }
})

updatePage()

title.addEventListener("click", () => {
        location.reload()
})

