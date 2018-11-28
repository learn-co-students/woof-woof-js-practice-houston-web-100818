document.addEventListener('DOMContentLoaded', () => {
  // DOM Elements
  const doggoBar = document.querySelector('#dog-bar')
  const doggoInfo = document.querySelector('#dog-info')
  const filterButton = document.querySelector('#good-dog-filter')

  // add event listener to filter button
  filterButton.addEventListener('click', function() {
    filterToggle()
    render()
  })

  const render = function() {
    // reset doggo bar div to empty
    doggoBar.innerHTML = ''
    // fetch all doggos
    fetch('http://localhost:3000/pups')
      .then(function(response) {
        return response.json()
      }).then(function(pups) {
          //filter out the bad boys if the filter is on
          if (filterButton.innerText === 'Filter good dogs: ON') {
            pups = filterGoodBoys(pups)
          }
          // iterate over filtered puppers
          pups.forEach(function(pupper) {
            // render each pupper's name in the doggo bar
            const pupperSpan = doggoBar.appendChild(document.createElement('span'))
            pupperSpan.innerText = pupper.name
            // add event listener to each pupper name
            pupperSpan.addEventListener('click', function() {
              renderDoggo(pupper)
            })
          })
      })
  }

  const renderDoggo = function(pupper) {
    // render doggo's info
    doggoInfo.innerHTML = `
      <img src="${pupper.image}">
      <h2>${pupper.name}</h2>
      <button id="goodify-button"></button>
    `

    // give goodify button text
    const goodifyButton = document.querySelector('#goodify-button')
    goodifyButton.innerText = pupper.isGoodDog ? "Good Dog!" : "Bad Dog!"

    // add event listener for goodify button
    goodifyButton.addEventListener('click', function() {
      goodifyDoggo(pupper)
    })
  }

  const goodifyDoggo = function(pupper) {
    // flip isGoodDog attribute
    pupper.isGoodDog = !pupper.isGoodDog
    updateDoggo(pupper)
    renderDoggo(pupper)
  }

  const updateDoggo = function(pupper) {
    // patch request to save new attributes of current pupper
    fetch(`http://localhost:3000/pups/${pupper.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type':'application/json'
      },
      body: JSON.stringify(pupper)
    }).then(function(response) {
      return response.json()
    }).then(render)
  }

  const filterGoodBoys = function(pups) {
    return pups.filter(function(pup) {
      return pup.isGoodDog === true
    })
  }

  const filterToggle = function() {
    if (filterButton.innerText === 'Filter good dogs: ON') {
      filterButton.innerText = 'Filter good dogs: OFF'
    } else {
      filterButton.innerText = 'Filter good dogs: ON'
    }
  }

  render()
})
