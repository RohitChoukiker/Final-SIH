import { BackendService } from "./config";
const AuthService = {
    async login(email:string, password:string) {
        return await BackendService.post("/login", { email, password });
    },
    async getAllUsers() {
        return await BackendService.get("/users");
    },
}

export default AuthService;