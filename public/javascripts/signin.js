function validateForm() {
   var username = document.forms["login-form"]["username"].value;
   var password = document.forms["login-form"]["password"].value;
   console.log("Username: " + username);
   console.log("Password: " + password);
   if (username == "") {
     alert("Username must be filled out");
     return false;
   }
   if (password == "") {
      alert("Password must be filled out");
      return false;
    }
}