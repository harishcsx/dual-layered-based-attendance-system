// File: backend/src/controllers/organisation.controller.js
// ---------------------------------------------------------

import * as OrganisationService from '../services/organisation.service.js';
import { AppError } from '../utils/AppError.js';

export const createClass = async (req, res, next) => {
    try {
        const classData = req.body;
        const organisationId = req.user.id; // from protect middleware
        
        if (!classData.name) {
            return next(new AppError('Class name is required.', 400));
        }

        const newClass = await OrganisationService.createClass(organisationId, classData);

        res.status(201).json({
            status: 'success',
            data: {
                class: newClass,
            }
        });
    } catch (error) {
        next(error);
    }
};

export const getAllClasses = async (req, res, next) => {
    try {
        const organisationId = req.user.id;
        const classes = await OrganisationService.getOrganisationClasses(organisationId);
        res.status(200).json({
            status: 'success',
            results: classes.length,
            data: {
                classes,
            }
        });
    } catch (error) {
        next(error);
    }
};

export const getClassById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const organisationId = req.user.id;
        const classDetails = await OrganisationService.getClassDetails(id, organisationId);

        if (!classDetails) {
            return next(new AppError('No class found with that ID for your organisation.', 404));
        }

        res.status(200).json({
            status: 'success',
            data: {
                class: classDetails,
            }
        });
    } catch(error) {
        next(error);
    }
};
