// let currentFilter = "Filter good dogs: OFF"

function fetchData() {
       fetch('http://localhost:3000/pups') 
      .then( function(response) {
      return response.json()
    })
      .then ( function(data) {
       render(data)
        addEventListeners(data)
    })

  };

function render(dogs) {
       //filter(dogs)
    
    const dogBar = document.querySelector('#dog-bar');
    const summary = document.querySelector('#dog-summary-container');
    dogBar.innerHTML = ""
    

    dogs.forEach(function(dog) {
        let currentStats;
        let newElement =  document.createElement('span');
        newElement.innerHTML = dog.name
        dogBar.append(newElement);

        newElement.addEventListener("click", function(){
            let dogInfo = document.createElement('div')
            
            if (dog.isGoodDog == true) {
                currentStats = "Good Dog!"
            }
            else {
                currentStats = "Bad Dog!"
            }

            dogInfo.innerHTML = `
            <img src=${dog.image}>
            <h2> ${dog.name} </h2>
            <button id="good-or-bad">${currentStats}</button> `
            
            summary.innerHTML = ""
            summary.append(dogInfo)
            let buttonGood = document.querySelector('#good-or-bad');
       
            buttonGood.addEventListener("click", function(){
                if (buttonGood.innerHTML == "Bad Dog!") {
                    buttonGood.innerHTML = "Good Dog!"
                    currentStats = "Good Dog!"
                    changeDb(dog, true)
                }
                else {
                    buttonGood.innerHTML = "Bad Dog!"
                    currentStats = "Bad Dog!"
                    changeDb(dog, false)
                }
            })
   
        })
    })
    
    
}

function changeDb(dog, trueOrFalse) {
    fetch(`http://localhost:3000/pups/${dog.id}`,  {
        method: 'PATCH',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            isGoodDog: trueOrFalse
            })
        }) 
}

function addEventListeners(dogs) {
    let filtered;
    const goodDogFilter = document.querySelector('#good-dog-filter')

    goodDogFilter.addEventListener("click", function(){
        if (goodDogFilter.innerHTML == "Filter good dogs: OFF"){
            goodDogFilter.innerHTML = "Filter good dogs: ON"
            filtered = dogs.filter(dog => dog.isGoodDog == true)
            render(filtered)
        }
        else if (goodDogFilter.innerHTML = "Filter good dogs: ON") {
            goodDogFilter.innerHTML = "Filter good dogs: OFF"
            render(dogs);
            console.log(goodDogFilter.innerHTML)
        }
    })
}



fetchData();