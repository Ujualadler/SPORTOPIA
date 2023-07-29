import axios from "axios";
import { bookingAPI } from "../Constants/Api";

const bookingInstance = axios.create({
    baseURL: bookingAPI,
});
export default bookingInstance;