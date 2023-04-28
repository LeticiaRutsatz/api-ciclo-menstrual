import { Response, Request } from 'express';

export class CicleController {
  async createCicle(req: Request, res: Response) {
    //const { name, email, password, age } = req.body;

    return res.json('teste ciclo');
  }
}
