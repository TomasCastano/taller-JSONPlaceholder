getPosts = () => {
    fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response => response.json())
        .then(json => {
            console.log(json)
            let posts = ''
            json.forEach(post => {
                posts += `
                <tr>
                    <td>${post.id}</td>
                    <td>${post.title}</td>
                    <td>${post.body}</td>
                    <td>${post.userId}</td>
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
