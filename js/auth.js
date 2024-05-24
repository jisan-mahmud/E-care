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
    if(info.password != info.confirm_password){
        let status = document.getElementById('alert');
        status.classList.remove('hidden', 'text-green-800')
        status.classList.add('flex', 'text-red-800')
        status.innerHTML = `
        <div class="ms-3 text-sm font-medium">
            Password does't match!
        </div>
        `
        return
    }else{
        document.getElementById('alert').classList.add('hidden')
        let pattern = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/
        if(!pattern.test(info.password)){
            let status = document.getElementById('alert');
            status.classList.remove('hidden', 'text-green-800')
            status.classList.add('flex', 'text-red-800')
            status.innerHTML = `
            <div class="ms-3 text-sm font-medium">
            Password must contain one digit from 1 to 9, one lowercase letter, one uppercase letter, one special character, no space,it must be 8-16 characters long. Should be password and username not same.
            </div>
            `
            return
        }
    }
    fetch("https://testing-8az5.onrender.com/patient/register/", {
        method: "POST",
        body: JSON.stringify(info),
        headers: {
            "Content-type": "application/json"
        }
    })
    .then(response => response.json())
    .then(json => {
        let status = document.getElementById('alert');
        status.classList.remove('hidden',  'text-green-800')
        status.classList.add('flex')
        status.innerHTML = `
        <div class="ms-3 text-sm font-medium">
            Registration successfull!
        </div>
        `
        event.target.reset()
        window.location.replace("./signin.html");
        login_status = document.getElementById('login_status')
        login_status.classList.add('flex');
        login_status.classList.remove('hidden')
    })
    .catch( e => {
        let status = document.getElementById('alert');
        status.classList.remove('hidden', 'text-red-800')
        status.classList.add('flex', 'text-red-800')
        status.innerHTML = `
        <div class="ms-3 text-sm font-medium">
            Something went wrong try again!
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
    fetch("https://testing-8az5.onrender.com/patient/login/", {
        method: "POST",
        body: JSON.stringify(info),
        headers: {
            "Content-type": "application/json"
        }
    })
    .then(response => response.json())
    .then(json => {
        if(json.error){
            let status = document.getElementById('login_alert')
            status.classList.remove('hidden', 'text-red-800')
            status.classList.add('flex', 'text-red-800')
            status.innerHTML = `
            <li class="ms-3 text-sm font-medium">
                ${json.error}
            </li>
            `
            return
        }
        if(json.user_id && json.token){
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