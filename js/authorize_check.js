function handle_authorization() {
    let account_access = document.getElementById('account_access');
    let profile = document.getElementById('profile');
    if(localStorage.getItem('user_id') && localStorage.getItem('token')){
        account_access.classList.add('hidden')
        profile.classList.remove('hidden')
    }else{
        account_access.classList.remove('hidden')
        profile.classList.add('hidden')
    }
}
handle_authorization()