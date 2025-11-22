import { Router } from 'express';
import { InsertComponent } from '../components';

/**
 * @constant {express.Router}
 */
const router: Router = Router();


router.post('/', InsertComponent.insert);


/**
 * @export {express.Router}
 */
export default router;
