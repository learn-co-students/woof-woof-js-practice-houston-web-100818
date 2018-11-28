const dogBar = document.querySelector("#dog-bar")
const dogInfo = document.querySelector("#dog-info")
const dogFilterButton = document.querySelector("#good-dog-filter")
let isFilterOn = false

const render = () => {
  fetch('http://localhost:3000/pups')
  .then( (response) => {
    return response.json();
  })
  .then( renderPups )
}

function renderPups(pups) {
  dogBar.innerHTML = ''
  pups.forEach( (pup) => {
    if(!isFilterOn || pup.isGoodDog) {
      let pupSpan = document.createElement('span')
      let pupName = pup.name
      pupSpan.innerText = `${pupName}`

      pupSpan.addEventListener('click', e => {
        renderPup(pup)
      })

      dogBar.append(pupSpan)
    }
  })
}

function renderPup(pup) {
  let buttonText;
  dogInfo.innerHTML = ''

  pup.isGoodDog ? buttonText = 'Good Dog!' : buttonText = 'Bad Dog!'
  dogInfo.innerHTML = `
    <img src=${pup.image}>
    <h2>${pup.name}</h2>
    <button id="dogGoodBad">${buttonText}</button>
  `

  const dogButton = document.querySelector("#dogGoodBad")
  dogButton.addEventListener('click', (e) => {
    pup.isGoodDog = !pup.isGoodDog
    fetch(`http://localhost:3000/pups/${pup.id}`, {
      method: 'PATCH',
      headers: {
      'Content-Type':'application/json'
    },
    body: JSON.stringify (
      {
        isGoodDog: pup.isGoodDog
      })
    })
    .then(renderPup(pup))
  })
}

dogFilterButton.addEventListener('click', (e) => {
  if (dogFilterButton.innerText.includes('OFF')) {
    dogFilterButton.innerText = 'Filter good dogs: ON'
    isFilterOn = true
    render()
  }
  else {
    dogFilterButton.innerText = 'Filter good dogs: OFF'
    isFilterOn = false
    render()
  }
})


// 1. only manipulate the dom in render, not in the event listener
// 2. use global variables to update display
// 3. in eventlistener, calls render or a save function to PATCH or POST, which renders. and in render, DOM is updated.
// 4. move eventlistener to global scope if it's not being created.
// in sources, add break points

render()
