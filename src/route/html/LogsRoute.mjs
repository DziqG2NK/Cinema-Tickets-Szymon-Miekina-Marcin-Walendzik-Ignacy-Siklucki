import { ReplyType, Route } from '../../Route.mjs';

import LogModel from '../../model/LogModel.mjs';

const LogsRoute = new Route(
    'GET', '/logs', ReplyType.HTML,
    async (_req, res) => {
        const Log = LogModel.use();

        const logs = await Log.findAll();
        return res.viewAsync('logs.hbs', { logs: logs.map(row => row.get()) });
    },
);

export default LogsRoute;
