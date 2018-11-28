//DOM elements
const dogBar = document.getElementById('dog-bar')
const dogInfo = document.getElementById('dog-info')
const filterButton = document.getElementById('good-dog-filter')

//data
let dogs;
let selectedDog;
let filtered = false;

fetch('http://localhost:3000/pups')
  .then(response => response.json())
  .then(function(result) {
    dogs = result
    render()
  })

filterButton.addEventListener('click', () => {
  filtered = !filtered
  render()
})

const render = function() {
  renderDogBar()
  renderSelectedDog()
  filterButton.innerText = filtered ? "Filter good dogs: ON" : "Filter good dogs: OFF"
}

const renderDogBar = function(){
  dogBar.innerHTML = ``
  dogs.forEach((dog) => {
    if (!filtered || dog.isGoodDog) {
      const dogSpan = document.createElement('span')
      dogSpan.innerText = dog.name
      dogBar.append(dogSpan)

      dogSpan.addEventListener('click', () => {
        selectedDog = dog
        render(dog)
      })
    }
    })
  }


const renderSelectedDog = function(){
  if(selectedDog){
    dogInfo.innerHTML = `
      <img src="${selectedDog.image}"> 
      <h2>${selectedDog.name}</h2> 
      `

      let toggleButton = document.createElement('button')
      toggleButton.innerText = selectedDog.isGoodDog ? 'Good Dog!' : 'Bad Dog!'
      dogInfo.append(toggleButton)
      toggleButton.addEventListener('click', () => {
        selectedDog.isGoodDog = !selectedDog.isGoodDog
        saveSelectedDog()
        render() //optimistic rendering
      })

  } else {
    dogInfo.innerHTML = `<h3>Please select a dog</h3>`
  }
}

const saveSelectedDog = function() {
  fetch(`http://localhost:3000/pups/${selectedDog.id}`, {
            method: 'PATCH',
            headers: {
              'Content-Type':'application/json'
            },
            body: JSON.stringify(selectedDog)
          }) //.then(render) for conditional rendering
}