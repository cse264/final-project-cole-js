function validateForm() {
   var username = document.forms["signup-form"]["username"].value;
   var password = document.forms["signup-form"]["password"].value;
   var password_confirm = document.forms["signup-form"]["password_confirm"].value;
   console.log("Username: " + username);
   console.log("Password: " + password);
   console.log("Password confirm: " + password_confirm);
   if (username == "") {
     alert("Username must be filled out");
     return false;
   }
   if (password == "") {
      alert("Password must be filled out");
      return false;
    }
    if (password_confirm == '') {
       alert("Password must be confirmed");
       return false;
    }
    if (password != password_confirm) {
      alert("Passwords do not match");
      return false;
    }
}