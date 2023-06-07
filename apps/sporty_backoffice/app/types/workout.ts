export type Workout = {
  date: string;
  dailyNote: string;
  Beginner: Sections[];
  Intermediate: Sections[];
  Advanced: Sections[];
  name: string;

  PK?: string;
  SK?: string;
  createdAt?: string;
  createdBy?: string;
  planId?: string;
  programId?: string;
  workoutId?: string;
};

export type Sections = {
  workoutName: string;
  sections: Section[];
  key: number;
};

export type Section = {
  settings: { sectionName: string; sectionNote: string; type: string; every?: string; totalTime?: string };
  movements: Movement[];
  key: number;
};

export type Movement = {
  movement: string;
  type: string;
  value: string;
  key: number;
};

export type ChildrenOfSettings = 'sectionName' | 'sectionNote' | 'type' | 'every' | 'totalTime';
export type ChildrenOfMovement = 'movement' | 'type' | 'value';
