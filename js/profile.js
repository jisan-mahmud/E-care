let load_profile_info = () => {
    const token = "Token " + localStorage.getItem('token');
    
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
    const token = "Token " + localStorage.getItem('token');

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

    patient_img.innerHTML = `<img class="rounded-full sm:w-40 sm:h-40" src="${info.image}" alt="">`;
    patient_info.innerHTML = `
        <h1 class="font-bold m-0 mb-2 p-0 text-3xl text-teal-500">${info.first_name} ${info.last_name}</h1>
        <span class="font-medium">Email: ${info.email}</span>
        <span class="font-medium">Phone: ${info.mobile_no}</span>
    `
}

let display_appointment = (appointments) =>{
    appointments.forEach(appointment => {
        console.log(appointment)

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

load_profile_info()
load_appointment()