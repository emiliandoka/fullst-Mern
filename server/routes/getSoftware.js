import express  from 'express';
import { getsoftwares, postSoftware, updatesoftware, getSingleSoftware, deleteSingleSoftware } from '../controllers/softwares.js';
const router = express.Router();

router.get('/', getsoftwares);
router.post('/', postSoftware);
router.put('/', updatesoftware);
router.get('/:slugSoft', getSingleSoftware);
router.delete('/:slugSoft' , deleteSingleSoftware)

export default router;