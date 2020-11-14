window.onload = function () {

    var signup = document.querySelector('#signup');
    if(signup) {
        document.getElementById("signup")
        .addEventListener("click",function(e){
            window.location.replace('/signup');
        });
    }

    var signin = document.querySelector('#signin');
    if(signin) {
        document.getElementById("signin")
        .addEventListener("click",function(e){
            window.location.replace('/signin');
        });
    }
 
    var signout = document.querySelector('#signout');
    if(signout) {
        document.getElementById("signout")
        .addEventListener("click",function(e){
            console.log("Signing out");
            fetch('/signout',
            {
                method:"POST",
                body: "",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(response => {
                location.reload();
            });
        });
    }
}