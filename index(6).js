// const content = document.querySelector('#content')
const submit = document.querySelector('#submit')
const update = document.querySelector('#update')
let users = document.querySelector('#users')
const del = document.querySelector('#del')

// POST
submit.addEventListener('click',()=>{
    let fname = document.querySelector('#fname').value
    let lname = document.querySelector('#lname').value
    let email = document.querySelector('#email').value
    let gender = document.querySelector('#gender').value

    let formData={
        fname,
        lname,
        email,
        gender
    }

    fetch("http://localhost:5000/myApi/members", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
            "Content-Type":"application/json",
        },
    }).catch((error)=>console.log(error))
    alert('Yey')
    location.reload()
})

window.addEventListener('load',()=>{
    getUsers()
})

function getUsers() {
    let html = ""

    fetch('http://localhost:5000/myApi',{mode:'cors'})
    .then(response => {
        return response.json()
    })
    .then(data=>{
        console.log(data)
        // display DOM
        data.forEach(e => {
            html+=
            `
            <tr>
                <td>
                    <span class="custom-checkbox">
                        <input type="checkbox" id="checkbox1" name="options[]" value="1">
                        <label for="checkbox1"></label>
                    </span>
                </td>
                <td>${e.id}</td>
                <td>${e.first_name} ${e.last_name}</td>
                <td>${e.email}</td>
                <td>${e.gender}</td>
                <td>
                    <a href="#editEmployeeModal" onClick="editMember(${e.id})" class="edit" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i></a>
                    <a onClick="deleteMember(${e.id})" href="javascript:" class="delete" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i></a>
                </td>
            </tr>
            `
            update.addEventListener('click',()=>{

            })
        })
        // console.log(html)

        users.innerHTML=html
    })
    .catch(error => {
        console.log(error)
    })
}

function deleteMember(id){
    let formData={id}

    if (confirm('YOOOOOO?') === true) {
        fetch("http://localhost:5000/myApi/members",{
        method:"DELETE",
        body:JSON.stringify(formData),
        headers:{
            "Content-Type":"application/json",
        }
        }).then((res)=>{
            return res.text()
        }).then(res=>console.log(res))
        .catch(error=>console.log(error))

        alert('Yey, Deleted!')
        location.reload()
    }
    else alert('Cancelled :(')
}

function editMember(id) {
    // search
    fetch(`http://localhost:5000/myApi/members/${id}`,{
        method:"GET",
        headers:{
            "Content-Type":"application/json"
        }
    })
    .then(res=>res.json())
    .then(data=>{
        document.querySelector('#fname').value=data[0].first_name
        document.querySelector('#lname').value=data[0].last_name
        document.querySelector('#email').value=data[0].email
        document.querySelector('#gender').value=data[0].gender
        document.querySelector('#ID').value=data[0].id
    })
    .catch(error=>console.log(error))
}

update.addEventListener('click',()=>{
    let fname=document.querySelector('#fname').value
    let lname=document.querySelector('#lname').value
    let email=document.querySelector('#email').value
    let gender=document.querySelector('#gender').value
    let id=document.querySelector('#ID').value
    
    let formData={
        fname,
        lname,
        email,
        gender,
        id
    }

    if(confirm('eeeeeeeegh!')){
        fetch(`http://localhost:5000/myApi/members/`,{
            method:"PUT",
            body:JSON.stringify(formData),
            headers:{
                "Content-Type":"application/json"
            }
        })
        .catch(error=>console.log(error))

        alert("uasgds")
        location.reload()
    }
    else alert('Cancelled')
    
})
