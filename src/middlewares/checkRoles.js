import createHttpError from 'http-errors';

import { StudentsCollection } from '../db/models/student.js';
import { ROLES } from '../constants/index.js';

export const checkRoles =
  (...roles) =>
  async (req, res, next) => {
    const { user } = req;
    if (!user) {
      console.log('No user found in request');
      next(createHttpError(401));
      return;
    }

    const { role } = user;
    console.log('User role:', role);

    if (roles.includes(ROLES.TEACHER) && role === ROLES.TEACHER) {
      next();
      return;
    }

    if (roles.includes(ROLES.PARENT) && role === ROLES.PARENT) {
      const { studentId } = req.params;
      console.log('Student ID from request params (Parent role):', studentId);
      if (!studentId) {
        next(createHttpError(403));
        return;
      }

      const student = await StudentsCollection.findOne({
        _id: studentId,
        parentId: user._id,
      });

      if (student) {
        next();
        return;
      }
    }

    console.log('Forbidden: Insufficient permissions or invalid role');
    next(createHttpError(403));
  };

// export const checkRoles =
//   (...roles) =>
//   async (req, res, next) => {
//     const { user } = req;
//     console.log('User in request:', user);
//     if (!user) {
//       next(createHttpError(401));
//       return;
//     }

//     const { role } = user;
//     console.log('User role:', role);

//     if (roles.includes(ROLES.TEACHER) && role === ROLES.TEACHER) {
//       next();
//       return;
//     }

//     if (roles.includes(ROLES.PARENT) && role === ROLES.PARENT) {
//       const { studentId } = req.params;
//       console.log('Student ID in request params:', studentId);
//       if (!studentId) {
//         next(createHttpError(403));
//         return;
//       }

//       const student = await StudentsCollection.findOne({
//         _id: studentId,
//         parentId: user._id,
//       });

//       if (student) {
//         next();
//         return;
//       }
//     }

//     next(createHttpError(403));
//   };
