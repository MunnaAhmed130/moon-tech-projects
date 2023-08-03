import axios from "axios";

let URL;

switch (import.meta.env.VITE_APP_ENVIRONMENT) {
  case "DEVELOPMENT":
    URL = "http://localhost:4000";
    break;
  case "PRODUCTION":
    URL = "http://moon-tech.com";
    break;
  default:
    URL = "http://localhost:4000";
}

const instance = axios.create({
  baseURL: URL,
});

export default instance;
