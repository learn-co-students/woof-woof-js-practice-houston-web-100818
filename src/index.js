const pupBar = document.querySelector('#dog-bar')
const pupInfo = document.querySelector('#dog-info')
const goodDogFilter = document.querySelector('#good-dog-filter')
const showPupPic = document.createElement('img')
const showPupName = document.createElement('h1')
const badGoodButton = document.createElement('button')

const render = function(){
  fetch('http://localhost:3000/pups')
    .then(function(response){
      return response.json()
    })
    .then(function(pups){
      pupBar.innerHTML = ''
      // dogInfo.innerHTML = ''

      renderPupsBar(pups)

      // goodDogFilter.addEventListener('click', function(e){
      //   dogInfo.innerHTML = ''
      //   pupBar.innerHTML = ''
      //   let filter = ''
      //   if(e.target.innerHTML == 'Filter good dogs: OFF'){
      //     filter = 'Filter good dogs: ON'
      //     goodDogFilter.innerHTML = filter
      //   }else{
      //     filter = 'Filter good dogs: OFF'
      //     goodDogFilter.innerHTML = filter
      //   }
      //   renderPupsBar(pups)
      // })

      badGoodButton.addEventListener('click', function(e){
        // dogInfo.innerHTML = ''
        // pupBar.innerHTML = ''
        let pupGoodBad = ''
        if(e.target.value == "true"){
          badGoodButton.innerHTML = "Bad Dog!"
          badGoodButton.value = "false"
          pupGoodBad = "false"
          dogInfo.append(badGoodButton)
        }else if (e.target.value == "false"){
          badGoodButton.innerHTML = "Good Dog!"
          badGoodButton.value = "true"
          pupGoodBad = "true"
          dogInfo.append(badGoodButton)
        }
        let pupID = e.target.id
        updatePup(pupID, pupGoodBad)
        // renderPupsInfo(pups[pupIndex])
      })
    })
};

const renderPupsBar = function(pups){
  let filterOnOff = goodDogFilter.innerHTML
  for(const pup of pups){
    // if((filterOnOff == 'Filter good dogs: OFF') || ((filterOnOff == 'Filter good dogs: ON') && (pup.isGoodDog == "true"))){
      const addPupToBar = document.createElement('span')
      addPupToBar.innerHTML = pup.name
      addPupToBar.addEventListener('click', function(e){
        dogInfo.innerHTML = ''
        renderPupsInfo(pup)
      })
      pupBar.append(addPupToBar)
    // }
  }
};

const renderPupsInfo = function(pup){
  // dogInfo.innerHTML = ''
  showPupName.innerHTML = pup.name
  showPupPic.src = pup.image
  badGoodButton.value = pup.isGoodDog
  badGoodButton.id = pup.id

  if(pup.isGoodDog == "true"){
    badGoodButton.innerHTML = "Good Dog!"
  }else if(pup.isGoodDog == "false"){
    badGoodButton.innerHTML = "Bad Dog!"
  }

  dogInfo.append(showPupName)
  dogInfo.append(showPupPic)
  dogInfo.append(badGoodButton)
};

const updatePup = function(id, goodBad){
  fetch(`http://localhost:3000/pups/${id}`, {
          method: 'PATCH',
          headers: {
              'Content-Type':'application/json'
          },
          body: JSON.stringify({
            isGoodDog: goodBad
          })
      }) .then ( render )
}

render();
