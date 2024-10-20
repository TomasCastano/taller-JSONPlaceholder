getPosts = () => {
    fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response => response.json())
        .then(json => {
            console.log(json)
            let posts = ''
            json.forEach(post => {
                posts += `
                <tr id="post${post.id}">
                    <td>${post.id}</td>
                    <td>${post.title}</td>
                    <td>${post.body}</td>
                    <td>${post.userId}</td>
                    <td class="actions-btns">
                        <button id="delete${post.id}" class="btn btn-danger" onclick="deletePost(${post.id})">Eliminar</button>
                    </td>
                </tr>`
            })
            
            let table = document.querySelector('#posts')
            table.innerHTML = `
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Título</th>
                    <th>Descripción</th>
                    <th>Usuario</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                ${posts}
            </tbody>
            `
        })

    .catch(error => console.log(error))
}

getPosts()

const createUser = (event) => {
    event.preventDefault()

    const title = document.getElementById('title').value
    const body = document.getElementById('body').value
    const userId = document.getElementById('userId').value

    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify({
            title: title,
            body: body,
            userId: userId,
        }),
        headers: {
            'Content-type': 'application/json charset=UTF-8',
        },
    })
    .then((response) => response.json())
    .then((json) => console.log(json))
    .catch(error => console.log(error))

    document.getElementById('postCardTitle').textContent = `Titulo: ${title}`
    document.getElementById('postCardBody').textContent = `Descripción: ${body}`
    document.getElementById('postCardUserId').textContent = `Usuario ${userId}`

    Swal.fire({
        title: "Felicitaciones!",
        text: "Post Creado Correctamente!",
        icon: "success"
    })

    console.log(title, body, userId)
}

const editPost = (event) => {
    event.preventDefault()

    const id = document.getElementById('postIdEdit').value  // ID ingresado por el usuario
    const titleEdit = document.getElementById('titleEdit').value
    const bodyEdit = document.getElementById('bodyEdit').value
    const userIdEdit = document.getElementById('userIdEdit').value

    if (!id) {
        Swal.fire({
            title: "Error!",
            text: "Por favor, ingresa un ID válido",
            icon: "error"
        })
        return
    }

    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            title: title,
            body: body,
            userId: userId,
        }),
        headers: {
            'Content-type': 'application/json charset=UTF-8',
        },
    })
    .then((response) => response.json())
    .then((json) => {
        console.log(json)

    })
    .catch(error => console.log(error))
   
    document.getElementById('editCardTitle').textContent = `Título: ${titleEdit}`
    document.getElementById('editCardBody').textContent = `Descripción: ${bodyEdit}`
    document.getElementById('editCardUserId').textContent = `Usuario: ${userIdEdit}`

    Swal.fire({
        title: "Éxito!",
        text: "Post editado correctamente",
        icon: "success"
    })
}

const deletePost = (id) => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method: 'DELETE',
    })
    .then((response) => response.json())
    .then((json) => console.log(json))
    .catch(error => console.log(error))

    Swal.fire({
        title: "¿Estás Seguro?",
        text: "No podrás revertir esto!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, eliminar",
        cancelButtonText: "Cancelar"
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: "Eliminado!",
                text: "El Post ha sido eliminado.",
                icon: "success"
            })

            document.getElementById(`post${id}`).remove()
        }
    })
}

