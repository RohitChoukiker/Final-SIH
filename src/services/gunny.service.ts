import { BackendService } from "./config";

const SourceGunnyService = {
    getPreDispatched: async () => {
        return (await BackendService.get("/source-gunnybags")).data;
    },

    patchGunnyBag: async (id: string) => {
        return await BackendService.patch(`/source-gunnybags/dispatch/${id}`);
    },

    getGunnyBag: async (id: string) => {
        return (await BackendService.get(`/source-gunnybags/${id}`)).data;
    }
}

export default SourceGunnyService;