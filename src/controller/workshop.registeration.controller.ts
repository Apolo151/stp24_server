import { Request, Response } from 'express';
import { sendFailure, sendSuccess } from '../utils/custom-response-handler';
import {
    dbAddWorkshopParticipant,
    dbGetAllWorkshopParticipants,
} from '../model/workshop.registeration.mode';
import { sendWorkshopRegisterationEmail } from '../utils/mail.templates';
import { WorkshopParticipant } from '../types/workshop-participants';

export async function addWorkshopParticipant(req: Request, res: Response) {
    try {
        const participant: WorkshopParticipant = req.body;
        await dbAddWorkshopParticipant(participant);
        await sendWorkshopRegisterationEmail(participant.email);
        sendSuccess(res, 201, 'Participant Added Successfuly');
    } catch (error) {
        sendFailure(res, 500, (error as Error).message);
    }
}

export async function getAllWorkshopParticipants(req: Request, res: Response) {
    try {
        const participants = await dbGetAllWorkshopParticipants();
        sendSuccess(res, 200, participants);
    } catch (error) {
        sendFailure(res, 500, (error as Error).message);
    }
}