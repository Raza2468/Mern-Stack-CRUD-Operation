var url = window.location.href.split(":");
if (url[0] === "https") {
    // url = "https://boilerplates-login-sign-mern.herokuapp.com"
}
else {
    url = "http://localhost:3030"

}

export default url;