let APIURL = "";

switch (window.location.hostname) {
  case "localhost" || "127.0.0.1":
    APIURL = "http://localhost:3000";
    break;
  case "time-tracking-client.onrender.com":
    APIURL = "https://gmgwwnkxeajwmmeqtsuk.supabase.co/rest/v1";
    break;
  default:
    console.log("Unable to connect");
}

export default APIURL;
