//my solution

const pupBar = document.querySelector('#dog-bar')
const pupInfo = document.querySelector('#dog-info')
const goodDogFilter = document.querySelector('#good-dog-filter')
const showPupPic = document.createElement('img')
const showPupName = document.createElement('h1')
const badGoodButton = document.createElement('button')

//data
let currentPup;
let filterOff = true;

const render = function(){
  fetch('http://localhost:3000/pups')
    .then(function(response){
      return response.json()
    })
    .then(function(pups){
      renderPupsBar(pups)
    })
}

const renderPupsBar = function(pups){
  pupBar.innerHTML = ''
  pups.forEach(function(pup){
    if(filterOff){
      pupBarFunc(pup)
    }else if(pup.isGoodDog){
      pupBarFunc(pup)
    }
  })

};

const pupBarFunc = function(pup){
  const addPupToBar = document.createElement('span')
  addPupToBar.innerHTML = pup.name
  addPupToBar.addEventListener('click', function(e){
    currentPup = pup
    renderPupInfo()
  })
  pupBar.append(addPupToBar)
}

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
};

badGoodButton.addEventListener('click', function(e){
  pupInfo.innerHTML = ''
  if(currentPup.isGoodDog){
    currentPup.isGoodDog = false
  }else{
    currentPup.isGoodDog = true
  }
  updatePup()
  if(filterOff){
    renderPupInfo(currentPup)
  }else if(currentPup.isGoodDog){
    renderPupsInfo(currentPup)
  }
});

goodDogFilter.addEventListener('click', function(e){
  pupInfo.innerHTML = ''
  if(filterOff){
    filterOff = false
    goodDogFilter.innerHTML = 'Filter good dogs: ON'
  }else{
    filterOff = true
    goodDogFilter.innerHTML = 'Filter good dogs: OFF'
  }
  render()
});


const updatePup = function(){
  fetch(`http://localhost:3000/pups/${currentPup.id}` , {
    method: 'PATCH',
    headers: {
      'Content-Type':'application/json'
    },
    body: JSON.stringify({
      isGoodDog: currentPup.isGoodDog
    })
  })
    .then(render)
};

render()
