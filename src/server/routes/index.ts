import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';

const router = Router();


router.get('/', (_, res) => {
  return res.send('raquel');
});

router.post('/test/:id', (req, res) => {
  return res.status( StatusCodes.ACCEPTED ).json(req.params); // .json return a json
});



export { router };