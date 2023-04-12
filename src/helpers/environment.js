let APIURL = "";

switch (window.location.hostname) {
  case "localhost" || "127.0.0.1":
    APIURL = "http://localhost:3000";
    break;
  case "time-tracking-client.onrender.com":
    APIURL = "https://time-tracking-web-service.onrender.com";
    break;
  default:
    console.log("Unable to connect");
}

export default APIURL;
