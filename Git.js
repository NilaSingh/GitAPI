let container=document.createElement('div')
let login=""
let repoName=document.createElement('input')
let repoDescription=document.createElement('input')
let gitkey=''
let nameOfDelete=document.createElement('input')

async function searchKey(e){
    e.preventDefault()
    gitkey=document.forms['keyform']["gitkey"].value
    document.getElementById('gitkey').remove()
    document.getElementById('submitkey').remove()
    let keydisplay=document.createElement('p')
    keydisplay.innerText="Access Token: "+gitkey
    document.body.appendChild(keydisplay)
    const response = await fetch("https:api.github.com/user",
    {headers:{
        'Authorization': "token "+gitkey               //fix for variable gitkey
    }})
    .then(response => response.json())
    .then(data => {
        let name=data.name
        login=data.login
        if(!login){
            keydisplay.innerText='INVALID KEY'
        }else{
        let greeting=document.createElement('p')
        greeting.innerText="Welcome, "+name
        document.body.appendChild(greeting)
        console.log(data)
    let getRepo=document.createElement('button')
    getRepo.innerText="Get Repos"
    getRepo.type='Submit'    
    container.appendChild(getRepo)

    let createForm=document.createElement('form')
    repoName.placeholder="Repo Name"
    repoDescription.placeholder="Repo Description"
    let createRepo=document.createElement('button')
    createRepo.innerText="Create Repo"
    createRepo.type='Submit'

    createForm.appendChild(repoName)
    createForm.appendChild(repoDescription)
    createForm.appendChild(createRepo)
    container.appendChild(createForm)

    let deleteForm=document.createElement('form')
    nameOfDelete.placeholder="Name of repo to delete"
    let deleteRepo=document.createElement('button')
    deleteRepo.innerText="Delete Repo"
    deleteRepo.type='Submit'
    deleteForm.appendChild(nameOfDelete)
    deleteForm.appendChild(deleteRepo)
    container.appendChild(deleteForm)
    document.body.appendChild(container)
    getRepo.addEventListener("click",getrepos)
    createRepo.addEventListener("click",create)
    deleteRepo.addEventListener("click",deleteR)
}
})
}
let repsRecord=document.createElement('div')
function getrepos(){
    if(repsRecord){
        repsRecord.innerHTML=''
    }
    fetch('https://api.github.com/users/'+login+'/repos')
        .then(response => response.json())
        .then(data =>{
            let i=0;
            console.log(data.length)
            while(i<data.length){
                let reps=document.createElement('li')
                reps.innerText=data[i].name
                repsRecord.appendChild(reps)
                i++
            }
            document.body.appendChild(repsRecord)
        })
}
function create(e){
    e.preventDefault()
    fetch('https://api.github.com/user/repos',{
        method: 'POST',
        body: JSON.stringify({name: repoName.value,description: repoDescription.value}),
        headers:{
            'Authorization': "token "+gitkey               //fix for variable gitkey
        }
    })
       .then(response => response.json())
       .then(data =>{
        let reps=document.createElement('li')
        reps.innerText=repoName.value
        repsRecord.appendChild(reps)   
        console.log(data)})
}
function deleteR(e){
    e.preventDefault()
    fetch('https://api.github.com/repos/'+login+'/'+nameOfDelete.value,{
        method:'DELETE',
        headers:{
            'Authorization':'token '+gitkey
        }
    })
    .then(data => {
        for(let i=0; i<repsRecord.children.length; i++){
            if(repsRecord.children[i].innerText===nameOfDelete.value){
                repsRecord.children[i].remove()
            }
        }
        console.log(data)
    })
}



document.getElementById('submitkey').addEventListener("click",searchKey)