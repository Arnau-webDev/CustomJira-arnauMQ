import { isValidObjectId } from "mongoose";
import { db } from "./";
import { Entry, IEntry } from "../models";

export const getEntryById = async (id: string): Promise<IEntry | null> => {
  if (!isValidObjectId(id)) return null;

  await db.connect();
  const entry = await Entry.findById(id).lean();
  await db.disconnect();

    //return this instead of entry to solve next not being able to serialize entry.id; [object Object] 
  return JSON.parse( JSON.stringify(entry) );
}
