import { rest } from "msw"
import { setupServer } from "msw/node"

export function createServer(handleConfig){
    const handlers = handleConfig.map((config) => {
        return rest[config.method || 'get'](config.path,(req, res, cxt) => {
            return res(cxt.json(config.res(req, res, cxt)));
        })
    })

    const server = setupServer(...handlers);

    beforeAll(() => {
        server.listen();
    })

    afterEach(() => {
        server.resetHandlers();
    })

    afterAll(() => {
        server.close();
    })
}