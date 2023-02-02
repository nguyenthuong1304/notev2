import { validationResult } from 'express-validator';
import mongoose from 'mongoose';

import { NoteModel } from '../models/index.js';
import { response } from '../utils/common.js';

export function createNote(req, res) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return response(res, 422, { errors: errors.array() })
  }

  const { title, content } = req.body;

  const note = new NoteModel({
    _id: mongoose.Types.ObjectId(),
    title,
    content,
    noteBy: req.user.id,
  });

  return note
    .save()
    .then(newNote => response(res, 201, { note: newNote, message: 'Tạo mới note thành công' }))
    .catch(err => {
      console.log(err)
      return response(res, 500, { message: 'Tạo mới note thất bại, vui lòng thử lại!' });
    })
}

export async function notes(_, res) {
  const notes = await NoteModel.find({ });

  return response(res, 200, { notes });
}

export async function note(req, res) {
  const note = await NoteModel.findById(req.params.id);

  if (!note) {
    response(res, 404, { message: 'Không tìm thấy ghi chú phù hợp!' });
  }

  return response(res, 200, { note });
}

export async function updateNote(req, res) {
  const note = await NoteModel.findById(req.params.id);

  if (!note) {
    response(res, 404, { message: 'Không tìm thấy ghi chú phù hợp!' });
  }

  note.title = req.body.title;
  note.content = req.body.content;
  await note.save();

  return response(res, 200, { note });
}

export async function deleteNote(req, res) {
  const data = await NoteModel.deleteOne({ _id: req.params.id })

  if (data.deletedCount) {
    return response(res, 200, { message: "Xoá thành công" });
  }
  
  return response(res, 400, { message: "Xoá thất bại" });
}