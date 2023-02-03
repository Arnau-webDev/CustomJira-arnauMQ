import type { NextApiRequest, NextApiResponse } from 'next'
import mongoose from 'mongoose';
import { db } from '../../../database';
import { Entry, IEntry } from '../../../models';

type Data = 
| { message: string }
| IEntry;

export default function handler (req: NextApiRequest, res: NextApiResponse<Data>) {

    const { id } = req.query;

    if(!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ message: `${id} is not a valid ID`});
    }

    switch (req.method) {
        case 'GET':
            return getEntry(req, res);

        case 'PUT':
            return updateEntry(req, res);
    
        default:
            return res.status(400).json({ message: 'This method does not exist'});
    };
}

const getEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { id } = req.query;

    await db.connect();

    const entryInDB = await Entry.findById(id);

    await db.disconnect();

    if(!entryInDB) {
        return res.status(400).json({message: `Entry with id: ${id} does not exist!`});
    }

    return res.status(200).json(entryInDB);
}

const updateEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    const { id } = req.query;

    await db.connect();

    const entryToUpdate = await Entry.findById(id);

    if(!entryToUpdate) {
        await db.disconnect();
        return res.status(400).json({message: `Entry with id: ${id} does not exist!`});
    }

    const { description: existingEntryDescription, status: existingEntryStatus} = entryToUpdate!;

    const { description = existingEntryDescription, status = existingEntryStatus} = req.body;

    try {
        const updatedEntry = await Entry.findByIdAndUpdate(id, { description, status}, { runValidators: true, new: true});
        await db.disconnect();

        return res.status(201).json(updatedEntry!);

    } catch (error: any) {
        console.log(error);
        await db.disconnect();

        return res.status(400).json({ message: error.errors.status.message});
    }
};