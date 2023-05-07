import { Response, Request } from 'express';
import { ResponseHelper } from '../../../../shared/adapter/http.helper';
import { CicleUseCase } from '../../domain/usecases/cicle.usecase';
import { CicleRepository } from '../../infra/repositories';

export class CicleController {
  async createCicle(req: Request, res: Response) {
    const { userId } = req.params;
    const { startDate, endDate, flow, symptoms } = req.body;
    const response = new ResponseHelper();
    const useCase = new CicleUseCase();

    console.log('symptomns', symptoms);

    const cicle = await useCase.execute({ startDate, endDate, flow, userId, symptoms });

    console.log('cicle', cicle);

    return response.success('Cicle created successfully!', res, cicle);
  }

  async getCicles(req: Request, res: Response) {
    const { id, userId } = req.params;
    const cicleRepository = new CicleRepository();
    const response = new ResponseHelper();

    try {
      if (!id) {
        if (req.user.email != process.env.ADMIN_EMAIL || req.user.id != process.env.ADMIN_ID) {
          return response.badRequest('You do not have the necessary access!', res);
        }

        const users = await cicleRepository.getAllCicles();
        return response.success('All cicles from the application!', res, users);
      }

      const cicle = await cicleRepository.getCicleById(id, userId);

      if (!cicle) {
        return response.badRequest('this ID do not exist!', res);
      }

      return response.success('Cicle search with success!', res, cicle);
    } catch (err) {
      return response.error('Error getting users!', res, err);
    }
  }

  async deleteCiclebyId(req: Request, res: Response) {
    const { id, userId } = req.params;
    const response = new ResponseHelper();
    const cicleRepository = new CicleRepository();

    if (req.user.email != process.env.ADMIN_EMAIL || req.user.id != process.env.ADMIN_ID) {
      return response.badRequest('You do not have the necessary access!', res);
    }

    try {
      const cicleDeleted = await cicleRepository.getCicleById(id, userId);
      await cicleRepository.deleteCiclebyId(id);
      return response.success('Cicle deleted!', res, cicleDeleted);
    } catch (err) {
      return response.error('Error deleting cicle!', res, err);
    }
  }
}
