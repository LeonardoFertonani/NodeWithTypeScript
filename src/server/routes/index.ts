import { Router } from 'express';
import { CidadesController } from './../controllers';

const router = Router();


router.get('/', (_, res) => {
  return res.send('working');
})

router.post('/cidades', CidadesController.create);



export { router };