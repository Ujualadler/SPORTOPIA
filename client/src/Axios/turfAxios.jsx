import axios from "axios";
import { turfAPI } from "../Constants/Api";

const turfInstance = axios.create({
    baseURL: turfAPI,
});
export default turfInstance;