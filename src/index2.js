const pupBar = document.querySelector('#dog-bar')
const pupInfo = document.querySelector('#dog-info')
const goodDogFilter = document.querySelector('#good-dog-filter')
const showPupPic = document.createElement('img')
const showPupName = document.createElement('h1')
const badGoodButton = document.createElement('button')

//data
let currentPup;

const render = function(){
  fetch('http://localhost:3000/pups')
    .then(function(response){
      return response.json()
    })
    .then(function(pups){
      console.log(pups)
      renderPupsBar(pups)
    })
}

const renderPupsBar = function(pups){
  pupBar.innerHTML = ''
  for(const pup of pups){
    const addPupToBar = document.createElement('span')
    addPupToBar.innerHTML = pup.name
    addPupToBar.addEventListener('click', function(e){
      currentPup = pup
      renderPupInfo()
    })
    pupBar.append(addPupToBar)
  }
};

const renderPupInfo = function(){
  pupInfo.innerHTML = ''
  showPupName.innerHTML = currentPup.name
  showPupPic.src = currentPup.image

  if(currentPup.isGoodDog){
    badGoodButton.innerHTML = "Good Dog!"
  }else{
    badGoodButton.innerHTML = "Bad Dog!"
  }

  pupInfo.append(showPupName)
  pupInfo.append(showPupPic)
  pupInfo.append(badGoodButton)
}

badGoodButton.addEventListener('click', function(e){
  if(currentPup.isGoodDog){
    currentPup.isGoodDog = false
  }else{
    currentPup.isGoodDog = true
  }
  updatePup()
})

const updatePup = function(){
  fetch(`http://localhost:3000/dogs/${currentPup.id}` , {
    method: 'PATCH',
    headers: {
      'Content-Type':'application/json'
    },
    body: JSON.stringify({
      isGoodDog: currentPup.isGoodDog
    })
  })
    .then(renderPupInfo)
}

render()
