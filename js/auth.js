const handle_signup = (event) => {
    event.preventDefault()
    const formData = new FormData(event.target);
    const formProps = Object.fromEntries(formData);
    info = {
        username: formProps.username,
        first_name: formProps.first_name,
        last_name: formProps.last_name,
        email: formProps.email,
        password: formProps.password,
        confirm_password: formProps.confirm_password
    }
    fetch("http://127.0.0.1:8000/patient/register/", {
        method: "POST",
        body: JSON.stringify(info),
        headers: {
            "Content-type": "application/json",
            "Redirect-Url": "http://127.0.0.1:5500/signin.html"
        }
    })
    .then(response => response.json())
    .then(json => {
        let status = document.getElementById('alert');
        status.innerHTML = ' '
        status.classList.remove('hidden',  'text-green-800')
        status.classList.add('flex')
        if(json.errors){
            console.log(json.errors)
            for (const [key, value] of Object.entries(json.errors)) {
                let li = document.createElement('li')
                li.innerHTML = `<li class="ms-3 text-sm font-medium">${value[0]}</li>`;
                status.appendChild(li)
                console.log(value[0])
              }

        }else{
            status.classList.remove('text-green-800')
            status.classList.add('text-green-800')
            status.innerHTML = `
            <div class="ms-3 text-sm font-medium">
                Registration succesfull. Check your email and active account.
            </div>
            `
            event.target.reset()
        }
    })
    .catch( e => {
        console.log(e)
        let status = document.getElementById('alert');
        status.classList.remove('hidden', 'text-red-800')
        status.classList.add('flex', 'text-red-800')
        status.innerHTML = `
        <div class="ms-3 text-sm font-medium">
            ${e}
        </div>
        `
        console.log(e)
    });
}

const handle_login = (event) => {
    event.preventDefault()
    const formData = new FormData(event.target);
    const formProps = Object.fromEntries(formData);
    info = {
        username: formProps.username,
        password: formProps.password,
    }
    fetch("http://127.0.0.1:8000/patient/login/", {
        method: "POST",
        body: JSON.stringify(info),
        headers: {
            "Content-type": "application/json"
        }
    })
    .then(response => {
        if(response.ok || response.status ==400){
            return response.json()
        }
        else if(response.status == 401){
            let status = document.getElementById('login_alert')
            status.classList.remove('hidden', 'text-red-800')
            status.classList.add('flex', 'text-red-800')
            status.innerHTML = `
            <li class="ms-3 text-sm font-medium">
            Username or Password Wrong!
            </li>
            `
        }
    })
    .then(json => {
        console.log(json)
        if (json.errors){
            let status = document.getElementById('login_alert')
            status.classList.remove('hidden', 'text-red-800')
            status.classList.add('flex', 'text-red-800')
            status.innerHTML = ' '
            for(const [key, value] of Object.entries(json.errors)){
                let li = document.createElement('li')
                li.classList.add('text-sm', 'font-medium')
                li.innerHTML = `
                    <p>${key} field may not be blank.</p><br/>
                `
                status.appendChild(li)
            }
        }
        else if(json.user_id && json.token){
            localStorage.setItem('user_id', json.user_id)
            localStorage.setItem('token', json.token)
            event.target.reset()
            window.location.replace("./index.html");
        }
    })
    .catch( e => {
        console.log(e)
    });
}