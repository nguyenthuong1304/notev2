import express from 'express';

import { createNote, notes, deleteNote, note, updateNote } from '../controllers/NoteController.js';
import { login, register } from '../controllers/AuthController.js';
import { authMiddleware } from '../middlewares/auth.js';
import { validate } from '../validation/index.js';

const router = express.Router();

router.post('/auth/register', validate.validateRegisterUser(), register);
router.post('/auth/login', login);

router.get('/notes', authMiddleware, notes);
router.get('/notes/:id', authMiddleware, note);
router.post('/notes', authMiddleware, validate.validateNote(), createNote);
router.put('/notes/:id', authMiddleware, validate.validateNote(), updateNote);
router.post('/notes/:id/delete', authMiddleware, deleteNote);

export default router;
