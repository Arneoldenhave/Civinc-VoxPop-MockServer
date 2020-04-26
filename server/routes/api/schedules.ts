import express from 'express';
const router = express.Router();

router.post('/', (req, res, next) => {
    res.status(200).send("lols")
    
});

export default router;