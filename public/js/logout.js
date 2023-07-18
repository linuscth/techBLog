const logOutHandler = async (event) => {
    const logOut = await fetch('api/users/logout', {
        method: 'POST'
    });

}

document.querySelector('.logOut').addEventListener('click', logOutHandler)