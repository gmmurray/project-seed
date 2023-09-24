import { ApiHandler } from '../../../lib/apiHandler/apiHandler';
import { ModelRepository } from '../../../models/model/modelRepository';

class RouteHandler extends ApiHandler {
  private modelRepository: ModelRepository;

  constructor() {
    super(true);
    this.modelRepository = new ModelRepository('model');
  }

  public POST: ApiHandler['POST'] = async (req, res) => {
    const { sub: userId } = await ApiHandler.getSessionUser(req, res);

    return ApiHandler.ok(res, { userId });
  };
}

const handler = new RouteHandler();

export default handler.createRouteHandler;
