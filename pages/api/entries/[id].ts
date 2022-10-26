import type { NextApiRequest, NextApiResponse } from 'next'
import mongoose from 'mongoose';
import { db } from '../../../database';
import { Entry } from '../../../models';
import { IEntry } from '../../../models/Entry';
import { validateConfig } from 'next/dist/server/config-shared';

type Data =
    | { message: string }
    | IEntry;

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    const { id } = req.query

    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ message: "invalid id" })
    }

    switch (req.method) {
        case 'GET':
            return getEntryById(req, res)

        case 'PUT':
            return updateEntry(req, res)

        default:
            return res.status(400).json({ message: 'method not fount' })
    }

}

const getEntryById = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    await db.connect()

    const { id } = req.query

    try {
        const entry = await Entry.findById(id)
        await db.disconnect()

        if (!entry) {
            return res.status(200).json({ message: "entry not found !!" })
        }

        return res.status(200).json(entry!)

    } catch (error) {
        await db.disconnect()
        console.log(error)
        return res.status(400).json({ message: "error entry: " + id })
    }
}

const updateEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    await db.connect()

    const { id } = req.query

    const entryToUpdate = await Entry.findById(id)

    if (!entryToUpdate) {
        await db.disconnect()
        return res.status(400).json({ message: "not found id: " + id })
    }

    const {
        description = entryToUpdate.description,
        status = entryToUpdate.status
    } = req.body

    try {
        const updatedEntry = await Entry.findByIdAndUpdate(id, { description, status }, { runValidators: true, new: true })
        await db.disconnect()
        return res.status(200).json(updatedEntry!)
    } catch (error: any) {
        await db.disconnect()
        console.log(error);
        return res.status(400).json({ message: error.errors.status.message })
    }
}