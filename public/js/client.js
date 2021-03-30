console.log("Client side javascript file is loaded!!")


const weatherForm = document.querySelector('form')
const searchElement = document.querySelector('input')
const msgOne = document.querySelector('#msg-1')
const msgTwo = document.querySelector('#msg-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = searchElement.value;

    msgOne.textContent = 'Loading...'
    msgTwo.textContent = ''

    fetch('http://localhost:3000/weather?address=' + encodeURIComponent(location)).then((response => {
        //console.log(response.json());
        response.json().then((data) => { //parsed data from response
            if(data.error)
            msgOne.textContent = data.error;
            else
            msgOne.textContent = data.location
            msgTwo.textContent = data.forecastData
        })
    }))
})