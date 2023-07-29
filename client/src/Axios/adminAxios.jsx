import axios from "axios";
import { adminAPI } from "../Constants/Api";

const adminInstance = axios.create({
    baseURL: adminAPI,
});
export default adminInstance;