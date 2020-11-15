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

    function getCookie(cname) {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for(var i = 0; i <ca.length; i++) {
          var c = ca[i];
          while (c.charAt(0) == ' ') {
            c = c.substring(1);
          }
          if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
          }
        }
        return "";
      }

    var theButton = document.querySelector('#theButton');
    if(theButton) {
        document.getElementById("theButton")
        .addEventListener("click", function(e){
            var uCookie = getCookie("username");
            var info = {
                username: uCookie
            };
            fetch('/getCash',
            {
                method:"POST",
                body: JSON.stringify(info),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(response => {

            });
        });
    }
}