// Static array with users data (from your example)
const users = [
    { firstName: 'dhuga', lastName: 'Harman', username: 'HD', password: '1234' },
    { firstName: 'Gates', lastName: 'David', username: 'DG', password: '1234' },
    { firstName: 'Oegema', lastName: 'Avery', username: 'AO', password: '1234' }
];

// Handle form submission
document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function (event) {
            event.preventDefault();

            const inputUsername = document.getElementById('username').value.trim();
            const inputPassword = document.getElementById('password').value.trim();

            if (inputUsername === '' || inputPassword === '') {
                alert('Please fill in both username and password.');
                return;
            }

            // Check if the username and password match
            const foundUser = users.find(user =>
                user.username === inputUsername && user.password === inputPassword
            );

            // If user is found, redirect to home.html (second page)
            if (foundUser) {
                // Store the user's information in localStorage (optional, for persistence across pages)
                localStorage.setItem('loggedInUser', JSON.stringify(foundUser));

                // Redirect to home page
                window.location.href = '../Main/index.html'; // Relative path to your second page
            } else {
                //tell person that it is wrong
                alert('Invalid username or password.');
                //clear password
                document.getElementById('password').value = ''; 
            }
        });
    } else {
        console.error('Login form not found');
    }
});
