document.addEventListener('DOMContentLoaded', () => {
  const dogBar = document.getElementById('dog-bar')

  const render = function() {
    fetch('http://localhost:3000/pups')
    .then(function(response) {
      return response.json()
    })
    .then(function(pups) {
      pups.forEach(function(pup, indexOfPup){
        const pupSpan = dogBar.appendChild(document.createElement('span'))
        pupSpan.innerHTML = `${pup.name}`
      })
    })
  }

  render()

})