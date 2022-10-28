import { isValidObjectId } from 'mongoose';
import { db } from '.';
import { Entry } from '../models';
import { IEntry } from '../models/Entry';


export const getEntryById = async (id: string): Promise<IEntry | null> => {


    if (!isValidObjectId(id)) return null

    await db.connect()

    const entry = await Entry.findById(id).lean()

    await db.disconnect()

    console.log(entry);

    return JSON.parse(JSON.stringify(entry))

}