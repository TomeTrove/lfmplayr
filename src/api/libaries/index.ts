
type REQ = Bun.BunRequest<"/api/libraries/status">;

const ROUTE = {
    GET: (req:REQ) => {
        return Response.json([]);
    },
}

export default ROUTE;