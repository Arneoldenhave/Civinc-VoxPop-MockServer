import express from 'express';
import TestController from '../../controllers/TestController';


const router = express.Router();
const testController = new TestController();

router.post('/factories', (req, res, next) => {
    return testController.start(req, res, next);
});

export default router;