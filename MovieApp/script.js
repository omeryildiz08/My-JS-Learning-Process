const apiKey = "a6a6c1a0" //api anahtarı
const baseUrl = "http://www.omdbapi.com/";
document.querySelector("#form").addEventListener("submit",(e)=>{
    e.preventDefault();
    const query = document.querySelector("#query").value.trim();
    if(query){
getMovies(query)
    }
})

//örnek film sorgusu
// API'den veri çekme fonksiyonu
function getMovies(query) {
    const container = document.querySelector(".row");
    container.innerHTML = ''; // Önceki filmleri temizle
    fetch(`http://www.omdbapi.com/?apikey=a6a6c1a0&s=${query}`)
        .then(response => response.json())
        .then(data => {
            if (data.Response === "True") {
                data.Search.forEach(movie => {
                    const movieCard = `
                        <div class="column">
                            <div class="card">
                                <center><img src="${movie.Poster}" class="thumbnail" alt="${movie.Title}"></center>
                                <h3>${movie.Title} (${movie.Year})</h3>
                            </div>
                        </div>
                    `;
                    container.innerHTML += movieCard;
                });
            } else {
                container.innerHTML = '<p>No movies found.</p>';
            }
        })
        .catch(error => console.error("Hata:", error));
}



