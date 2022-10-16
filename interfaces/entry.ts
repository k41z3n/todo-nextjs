export interface Entry {
  _id: string;
  description: string;
  createAt: number;
  status: StatusEntryType;
}

export type StatusEntryType = 'pennding' | 'in-progress' | 'finished';
