import axios from "axios";
import { BackendService } from "./config";

const OptimizationService = {
    getpath: async (data: any) => {
        return (await axios.post("https://spflask.onrender.com/calc", data)).data;
    },
    sendSms: async (data: any) => {
        return (await BackendService.post("/notifications/sms", data)).data;
    }
}

export default OptimizationService;