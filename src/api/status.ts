import { BUILD_CONSTS } from "@/utils/build-constants";

type REQ = Bun.BunRequest<"/api/status">;

const ROUTE = {
    GET: (req: REQ) => {
        return Response.json({
            VERSION: BUILD_CONSTS.VERSION
        });
    },
}

export default ROUTE;