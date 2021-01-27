// const handleSearch = (e) => {
//   e.preventDefault()
//   alert('clecked')
// }

const searchBtn = document.getElementById("searchBtn")

searchBtn.onclick = (e) => {
  e.preventDefault()
  

  const inputValue = document.getElementById("inputField").value
  const lists = document.getElementById("lists")




  if(!inputValue) return alert("Please enter a value")

  fetch(`http://localhost:9001/api/v1/search?q=${inputValue}`)
    .then(response => response.json())
    .then(data => {
      console.log(data)
      lists.innerHTML = ''

      if(!data.data.length){
        alert("Couldn't find word.")
        return
      }

      for (let index = 0; index < data.data.length; index++) {
        const element = data.data[index];
        const div = document.createElement('div')
        div.className = "item"
        div.innerText = `${index+1}.   ${element}`
      
        lists.appendChild(div)
        
      }
    }).catch((err) => {
      console.log('err', err)
    })
 
  

  

}