//API bilgileri
const apiKey = 'bdb1fae3c5981aa49463e62748264ea7';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

//DOM elemanlarını seçme
const searchBtn = document.getElementById('searchbtn');
const searchBar = document.getElementById('searchbar');
const resultDiv = document.getElementById('result');

//Butona tıkladığında çalışacak fonksiyon
searchBtn.addEventListener('click', () => {
const city = searchBar.value.trim(); //kullanıcının girdiği şehir
if (!city) {
    resultDiv.textContent = 'Lütfen bir şehir adı giriniz';
    return;
}
    //API'ye istek gönderme
    fetch(`${apiUrl}?q=${city}&appid=${apiKey}&units=metric`)
    .then(response =>{
        if(!response.ok){
            throw new Error('Şehir bulunamadı');
        }
        return response.json();
    })
    .then(data => {
        console.log(data); //gelen veriyi konsola yazdırma
        resultDiv.textContent = `Tempereature in ${data.name} : ${data.main.temp}°C`; //sayfada sonuç gösterme
    })
    .catch(error => {
        console.error(error);
        resultDiv.textContent = 'Couldnt retrieve data';
    });
});

