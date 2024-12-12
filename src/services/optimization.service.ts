import axios from "axios";

const OptimizationService = {
    getpath: async (data: any) => {
        return (await axios.post("http://localhost:5000/calc", data)).data;
    }
}

export default OptimizationService;