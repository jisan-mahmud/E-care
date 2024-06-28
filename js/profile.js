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

let display_profile_info = (info) => {
    console.log(info)
}

load_profile_info()