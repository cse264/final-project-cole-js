window.onload = function () {

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
            window.location.replace('/');
        });
    }
}