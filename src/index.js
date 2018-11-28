const dogBar = document.querySelector('#dog-bar')
const dogInfo = document.querySelector('#dog-info')


// data
let selectedDog;

const render = function(){
    console.log('rendering')
    fetch('http://localhost:3000/pups')
        .then(function(response){
            return response.json()

        })
        .then(function(dogs){
           renderDogs(dogs)
        })
    }
    
    
    
    const renderDogs = function(dogs){
        dogBar.innerHTML = ''
        dogs.forEach(function (dog) {
            // declaring & creating elements
            const dogSpan = document.createElement('span')

            // setting html
            dogSpan.innerHTML = `${dog.name}`
           
         
            // appending
            dogBar.append(dogSpan)

            

            dogSpan.addEventListener('click', function(){
                selectedDog = dog
                renderDogs(dogs)
            })

        })
        if(selectedDog){
            const dogName = document.createElement('h2')
            const dogImage = document.createElement('img')
            const goodDog = document.createElement('button')
            dogName.innerHTML = `${selectedDog.name}`
            dogImage.src = `${selectedDog.image}`
            goodDog.innerHTML = "Bad Dog!"

            if (selectedDog.isGoodDog == true) {
                console.log('Good Dog!')
                goodDog.innerHTML = "Good Dog!"
            }
            dogInfo.innerHTML = ''
            dogInfo.append(dogName)
            dogInfo.append(dogImage)
            dogInfo.append(goodDog)
            // event listener
            goodDog.addEventListener('click', function (e) {
                e.preventDefault()
                selectedDog.isGoodDog = !selectedDog.isGoodDog
                fetch(`http://localhost:3000/pups/${selectedDog.id}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        isGoodDog: selectedDog.isGoodDog
                    })

                })
                    .then(render)
            })
        }
    }


    render()