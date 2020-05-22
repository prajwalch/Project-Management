const saveButton = document.querySelector("#addprojectbutton");

saveButton.addEventListener("click", e => {

  /*## Taking the project name query from the input box ##*/
  const projectName = document.querySelector("#project-name-query")

  /*## Taking the all options and resassigning the only select option value to new variable ##*/
  const statusOption = document.querySelectorAll(".statusopt");

  let selectedOption = '';
  statusOption.forEach(option => {
    if (option.checked === true) {
      selectedOption = option.value
    }
  })

  /*## Taking the selected start and end date value ##*/
  const startDate = document.querySelector("#startdate");
  const endDate = document.querySelector("#enddate");


  /*## Checking the gaven input whether required fields values are empty or not ##*/
  if ((!projectName.value || !selectedOption)) {

    const messageDisplayer = document.querySelector("#error-message")

    const newPTag = document.createElement('p')
    newPTag.textContent = 'Incomeplete given input!!';
    
    messageDisplayer.style.display = 'block'
    messageDisplayer.appendChild(newPTag)

    setTimeout(() => {
      messageDisplayer.removeChild(newPTag)
      messageDisplayer.style.display = 'none'
    }, 2000);

    return false;
  }

  /*## Making the object of all given input values ##*/
  const detailsObject = {
    name: projectName.value,
    status: selectedOption,
    starting: startDate.value,
    finishing: endDate.value
  }
  
  console.log(detailsObject.starting)
  
  /*## Storing the given details on local storage ##*/
  /*## Before storing the details checking whether data is being already stored or not if it is already stored then that data will taken out, converted to array and push or unshift new value to it and again converted to JSON and stored to local storage but if the data wasn't stored before it will store the new data to it. ##*/
  
  if (localStorage.getItem('projects') === null) {
    /*## Creating new empty array to push or unshift detailsObject to it ##*/
    let detailsArray = []
    detailsArray.unshift(detailsObject)
    
    // Creating new localStorage
    localStorage.setItem('projects', JSON.stringify(detailsArray))
  } else {
    
    // Taking out already exist data to uodate it.
    const takenOutData = JSON.parse(localStorage.getItem('projects'));
    
    // Updating/ storing new data to array
    takenOutData.unshift(detailsObject)
    
    //  Again storing to storage after updated it.
    localStorage.setItem('projects', JSON.stringify(takenOutData))
  }
  
  projectName.value = ' ';
  statusOption.forEach(option => {
    option.checked = false
  })
  startDate.value = ' '
  endDate.value = ' '
  e.target.value = 'Saved'
  
  setTimeout(() => {
  e.target.value = 'Save'
  }, 3000);
  
})