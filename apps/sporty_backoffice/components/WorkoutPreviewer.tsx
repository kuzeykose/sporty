import { useEffect } from 'react';
import { Box, Card } from 'ui';

type Movement = {
  movement: string;
  type: string;
  value: string;
  key: number;
};

type Section = {
  settings: { sectionName: string; sectionNote: string; type: string; every?: string; totalTime?: string };
  movements: Movement[];
  key: number;
};

type ChildrenOfSettings = 'sectionName' | 'sectionNote' | 'type' | 'every' | 'totalTime';
type ChildrenOfMovement = 'movement' | 'type' | 'value';

type Workout = {
  workoutName: string;
  sections: Section[];
  key: number;
};

type Level = {
  date: string;
  dailyNote: string;
  Beginner: Workout[];
  Intermediate: Workout[];
  Advanced: Workout[];
};

type WorkoutPreviewer = {
  workouts: Level;
  dailyNote?: string;
};

const WorkoutPreviewer = ({ dailyNote, workouts }: WorkoutPreviewer) => {
  return (
    <div className="space-y-2">
      <div className="overflow-auto space-y-2">
        {dailyNote && <p className="font-semibold text-gray-700">{dailyNote}</p>}
        <div className="sm:flex sm:gap-4 sm:justify-between ">
          {Object.entries(workouts).map(
            ([key, value]) =>
              ['Beginner', 'Intermediate', 'Advanced'].includes(key) &&
              typeof value !== 'string' && (
                <div className="mt-4 sm:mt-0 w-72">
                  <h4 className="ml-2 font-medium">{key}</h4>

                  <div className="border p-4 rounded-xl space-y-4">
                    {value.map((workout) => (
                      <div>
                        <h3 className="text-xl mb-2">{workout.workoutName}</h3>
                        {workout.sections.map((section) => (
                          <Box>
                            <p className="text-lg text-yellow-500">{section.settings?.sectionName}</p>
                            <p className="text-sm">
                              {section.settings?.sectionNote && <span className="text-orange-500">Coach Note: </span>}
                              {section.settings?.sectionNote}
                            </p>

                            <div className="px-4 py-2">
                              <p>
                                {section?.settings?.type}
                                {section?.settings?.totalTime && ` - ${section?.settings?.totalTime} minutes`}
                              </p>
                              {section?.settings?.every && (
                                <p className=" text-gray-500">
                                  {section?.settings?.every && `Every ${section?.settings?.every} minutes for `}
                                  {section?.settings?.totalTime && `${section?.settings?.totalTime} minutes`}
                                </p>
                              )}

                              <ul className="list-disc flex flex-col mt-3">
                                {section?.movements.map((movement) => (
                                  <li>
                                    {movement.value} {movement.type === 'duration' && 'Sec.'} {movement.movement}{' '}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </Box>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              )
          )}
        </div>
      </div>
    </div>
  );
};

export default WorkoutPreviewer;
