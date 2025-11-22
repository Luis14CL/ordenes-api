import { Router } from 'express';
import { OrderComponent } from '../components';

/**
 * @constant {express.Router}
 */
const router: Router = Router();


router.post('/', OrderComponent.get);

router.post('/export', OrderComponent.exportData);


/**
 * @export {express.Router}
 */
export default router;
