let APIURL = "";

switch (window.location.hostname) {
    case "localhost" || "127.0.0.1":
        APIURL = "http://localhost:3000";
        break;
    case "cs-timetrackerclient.herokuapp.com":
        APIURL =
            "https://thingproxy.freeboard.io/fetch/https://cs-timetrackerapp.herokuapp.com";
        break;
        default : console.log("Unable to connect")
}

export default APIURL;