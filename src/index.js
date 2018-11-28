//josh's solution

const dogBar = document.querySelector('#dog-bar')
const dogInfo = document.querySelector('#dog-info')
const filterButton = document.querySelector('#good-dog-filter')

//dogs
let selectedDog;
let dogs;
let filterIsOn;

fetch('http://localhost:3000/pups')
  .then(function(response){
    return response.json()
  })
  .then(function(result){
    dogs = result //setting result to a global variable for use
    render()
  })


const render = function(){
  renderDogBar()
  renderSelectedDog()
  filterButton.innerText = filterIsOn ? "Filter good dogs: ON" : "Filter good dogs: OFF"
}

filterButton.addEventListener('click', function(e){
  filterIsOn = !filterIsOn
  render()
})

const renderDogBar = function(){
  dogBar.innerHTML = ''
  dogs.forEach(function(dog){
    if(!filterIsOn || dog.isGoodDog){
      const dogSpan = document.createElement('span')
      dogSpan.innerText = dog.name
      dogBar.append(dogSpan)

      dogSpan.addEventListener('click', function(){
        selectedDog = dog
        render(dogs)
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
    toggleButton.addEventListener('click', function(){
      selectedDog.isGoodDog = !selectedDog.isGoodDog
      saveSelectedDog()
    })
  }else{
    dogInfo.innerHTML = `
      <h3>Please Select a dog</h3>
    `
  }
}

const saveSelectedDog = function(){
  fetch(`http://localhost:3000/pups/${selectedDog.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type':'application/json'
    },
    body: JSON.stringify(selectedDog)
  }).then( render )
}
