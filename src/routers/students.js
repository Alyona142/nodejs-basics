import { Router } from 'express';

import {
  createStudentController,
  deleteStudentController,
  getStudentByIdController,
  getStudentsController,
  patchStudentController,
  upsertStudentController,
} from '../controllers/students.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import {
  createStudentSchema,
  updateStudentSchema,
} from '../validation/students.js';
import { isValidId } from '../middlewares/isValidId.js';

const router = Router();
router.get('/students', getStudentsController);
router.get(
  '/students/:studentId',
  isValidId,
  ctrlWrapper(getStudentByIdController),
);
router.post(
  '/students',
  validateBody(createStudentSchema),
  ctrlWrapper(createStudentController),
);
router.delete('/students/:studentId', ctrlWrapper(deleteStudentController));
router.put(
  '/students/:studentId',
  validateBody(createStudentSchema),
  ctrlWrapper(upsertStudentController),
);
router.patch(
  '/students/:studentId',
  validateBody(updateStudentSchema),
  ctrlWrapper(patchStudentController),
);

export default router;
