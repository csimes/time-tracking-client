let APIURL: string | undefined;

switch (window.location.hostname) {
  case "localhost":
  case "127.0.0.1":
    APIURL = "http://localhost:3000";
    break;
  case "time-tracking-client.onrender.com":
    APIURL = "https://time-tracking-web-service.onrender.com";
    break;
  default:
    console.error("Unable to determine API URL");
}

if (!APIURL) {
  throw new Error("API URL is not set");
}

export default APIURL;
