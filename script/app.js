document.addEventListener("DOMContentLoaded", () => {

  const doingProject = document.querySelector(".working")
  const pendingProjects = document.querySelector(".pending")
  const completedProjects = document.querySelector(".completed")

  const projectsArray = JSON.parse(localStorage.getItem('projects'))

  projectsArray.forEach(data => {

    if (data.status === 'working') {
      doingProject.innerHTML +=
      `<li class= "item" onclick="update('${data.name}', '${data.status}')">
      ${data.name} <span>From: ${data.starting}&nbsp; To: ${data.finishing}</span>
      </li>`
    }

    if (data.status === 'pending') {
      pendingProjects.innerHTML +=
      `<li class= "item" onclick="update('${data.name}')">
      ${data.name} <span>From: ${data.starting} To: ${data.finishing}</span>
      </li>`
    }

    if (data.status === 'completed') {
      completedProjects.innerHTML +=
      `<li class= "item">
      ${data.name} <span>From: ${data.starting} To: ${data.finishing}</span>
      </li>`
    }
  })

})

const update = (argname) => {
  
  
  const oldData = JSON.parse(localStorage.getItem('projects'));
  
  oldData.forEach(data => {
    if (data.name === argname) {
      if (data.status === 'working') {
        data.status = 'completed'
      }
      if (data.status === 'pending') {
        data.status = 'working'
      }
    }
  })
  
  const newData = oldData
  localStorage.setItem('projects',  JSON.stringify(newData))
}