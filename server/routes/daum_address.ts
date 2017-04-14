import { Router } from 'express';

const router = Router();

router.get('/', function(req, res, next) {
  res.render('daum_address', { title: 'Daum Address' });
});

export default router;
