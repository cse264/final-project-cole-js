window.onload = function () {

    var signup = document.querySelector('#signup');
    if(signup) {
        document.getElementById("signup")
        .addEventListener("click",function(e){
            location.href='/signup';
        });
    }

    var signin = document.querySelector('#signin');
    if(signin) {
        document.getElementById("signin")
        .addEventListener("click",function(e){
            location.href='/signin';
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

    var profile = document.querySelector('#profile');
    if(profile) {
        document.getElementById("profile")
        .addEventListener("click", function(e){
            location.href='/users/'+getCookie("username");
        });
    }

    document.getElementById("leaderboard")
        .addEventListener("click", function(e){
            location.href='/leaderboard';
        });

    document.getElementById("home")
        .addEventListener("click", function(e){
            location.href='/';
        });

    document.getElementById("setCash")
        .addEventListener("click", function(e) {
        fetch('/cash',
        {
            method:"PUT",
            body: JSON.stringify({
                cash: document.getElementById("cash").value,
                username: document.getElementById("username").value
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(response => {
            alert("User's cash has been updated");
        });
    });
}