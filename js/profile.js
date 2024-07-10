const token = "Token " + localStorage.getItem('token');

let load_profile_info = () => {
    
    fetch("http://127.0.0.1:8000/patient/profile/", {
        method: "GET",
        headers: {
            "Content-type": "application/json",
            "Authorization": token
        }
    })
    .then((res) => {
        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
    })
    .then((data) => {
        display_profile_info(data);
    })
    .catch((err) => {
        console.error('Error fetching profile:', err);
    });
}

let load_appointment = () => {

    fetch('http://127.0.0.1:8000/appointment/',{
        method: 'GET',
        headers: {
            "Content-type": "application/json",
            "Authorization": token
        }
    })
    .then((res) => {
        if(!res.ok){
            throw new Error(`Http Error status ${res.status}`);
        }
        return res.json()
    }).then((data) => {
        display_appointment(data)
    })
    .catch((err) => {
        console.log(err)
    })
}


let display_profile_info = (info) => {
    const patient_img = document.getElementById("patient_img");
    const patient_info = document.getElementById("patient_info");

    // in dialog box
    const name = document.getElementById('name')
    const email = document.getElementById('email')
    const number = document.getElementById('number')

    patient_img.innerHTML = `<img class="rounded-full sm:w-40 sm:h-40" src="${info.image}" alt="">`;
    patient_info.innerHTML = `
        <h1 class="font-bold m-0 mb-2 p-0 text-3xl text-teal-500">${info.first_name} ${info.last_name}</h1>
        <span class="font-medium">Email: ${info.email}</span>
        <span class="font-medium">Phone: ${info.mobile_no}</span>
    `
    if(info.first_name && info.last_name){
        name.value = `${info.first_name} ${info.last_name}`
    }
    if(info.email){
        email.value = info.email
    }
    if(info.mobile_no){
        number.value = info.mobile_no
    }
}

let display_appointment = (appointments) =>{
    appointments.forEach(appointment => {

        const appointment_table = document.getElementById('appointment_table');
        const tr = document.createElement('tr');
        tr.classList.add('bg-white', 'border-b')
        tr.innerHTML = `
            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                ${appointment.appointment_type}
            </th>
            <td class="px-6 py-4">
                ${appointment.appointment_status}
            </td>
            <td class="px-6 py-4">
                ${appointment.symtom}
            </td>
            <td class="px-6 py-4">
                ${appointment.doctor}
            </td>
            <td class="px-6 py-4">
                <a href="#" class="font-medium text-blue-600">Cancel</a>
            </td>
        `
        appointment_table.appendChild(tr)

    });
}

let edit_profile = () =>{
    const form = document.getElementById('edit_profile');
    const name = document.getElementById('name');
    const file = document.getElementById('file');
    const email = document.getElementById('email');
    const number = document.getElementById('number');

    form.addEventListener('submit', (event) => {
        event.preventDefault()

        const formData = new FormData();
        formData.append('first_name',  name.value.split(" ")[0])
        formData.append('last_name', name.value.split(" ")[1])
        formData.append('email', email.value)
        formData.append('mobile_no', number.value)
        if(file.files[0]){
            formData.append('image', file.files[0])
        }

        console.log(formData)

        fetch('http://127.0.0.1:8000/patient/profile/', {
            method: "PUT",
            headers:{
                "Authorization": token
            },
            body: formData
        })
        .then((res) => {
            if(!res.ok){
                throw new Error(`Http error status ${res.status}`)
            }
            return res.json()
        })
        .then((info) => {
            console.log(info)
        })
    })

}


load_profile_info()
load_appointment()
edit_profile()