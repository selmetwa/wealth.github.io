const combineButton = document.querySelector('.combine');
const regionButton = document.querySelector('.region');
const globalButton = document.querySelector('.global');

combineButton.addEventListener('click', () => {
    // active
    combineButton.style.backgroundColor = '#5F5FAB'
    combineButton.style.color = '#fafafa'

    // inactive 
    regionButton.style.backgroundColor = 'rgb(235, 235, 235)'
    regionButton.style.color = 'rgb(179, 179, 179)'

    // inactive 
    globalButton.style.backgroundColor = 'rgb(235, 235, 235)'
    globalButton.style.color = 'rgb(179, 179, 179)'
})

regionButton.addEventListener('click', () => {
    // active
    regionButton.style.backgroundColor = '#5F5FAB'
    regionButton.style.color = '#fafafa'

    // inactive 
    combineButton.style.backgroundColor = 'rgb(235, 235, 235)'
    combineButton.style.color = 'rgb(179, 179, 179)'

    // inactive 
    globalButton.style.backgroundColor = 'rgb(235, 235, 235)'
    globalButton.style.color = 'rgb(179, 179, 179)'
})

globalButton.addEventListener('click', () => {
    // active
    globalButton.style.backgroundColor = '#5F5FAB'
    globalButton.style.color = '#fafafa'

    // inactive 
    combineButton.style.backgroundColor = 'rgb(235, 235, 235)'
    combineButton.style.color = 'rgb(179, 179, 179)'

    // inactive 
    regionButton.style.backgroundColor = 'rgb(235, 235, 235)'
    regionButton.style.color = 'rgb(179, 179, 179)'
})