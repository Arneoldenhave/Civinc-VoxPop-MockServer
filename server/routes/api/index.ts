import express from 'express';
import schedules from './schedules';
import tests from './tests';

const router = express.Router();
router.use('/schedules', schedules);
router.use('/tests', tests);

export default router;
