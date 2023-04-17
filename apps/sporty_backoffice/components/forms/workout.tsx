import React from 'react';
import { useEffect, useRef, useState } from 'react';
import { Box, ButtonVariants } from 'ui';
import { Button, Card, Input } from 'ui';
import { MinusCircleIcon } from '@heroicons/react/24/solid';

type Movement = {
  movement: string;
  type: string;
  duration: string;
};

type Section = {
  settings: { sectionName: string; sectionNote: string; type: string };
  movements: Movement[];
};

type Workout = {
  workoutName: string;
  sections: Section[];
};

const Workout = () => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [currentLevelTab, setCurrentLevelTab] = useState<string>();

  const tabs = [{ name: 'Beginner' }, { name: 'Intermediate' }, { name: 'Advanced' }];

  useEffect(() => {
    console.log(workouts);
  }, [workouts]);

  const handleAddMovement = (parentIndex: number, index: number) => {
    const movement = { movement: '', type: '', duration: '' };
    setWorkouts((prevState: Workout[]) => {
      const state = [...prevState];
      state[parentIndex].sections[index].movements.push(movement);
      return state;
    });
  };

  const handleAddSection = (parentIndex: number) => {
    const section = { settings: { sectionName: '', sectionNote: '', type: '' }, movements: [] };
    setWorkouts((prevState: Workout[]) => {
      const state = [...prevState];
      state[parentIndex].sections.push(section);
      return state;
    });
  };

  const handleAddWorkout = () => {
    const workout = { workoutName: '', sections: [] };
    setWorkouts([...workouts, workout]);
  };

  return (
    <>
      <div className="mx-3 grid grid-cols-4 gap-4">
        <Box className="col-span-3 flex flex-col space-y-2">
          {workouts?.map((workout: Workout, parentIndex: number) => (
            <Card className="flex flex-col space-y-2 border" key={parentIndex}>
              <div className="flex justify-end">
                <Button>x</Button>
              </div>
              <Input name={`workout[${0}][workoutName]`} label="Workout Name" />
              <hr />
              {workout?.sections.map((section: Section, index: number) => (
                <Box className="flex min-w-[400px] gap-6">
                  <Box className="text-xl space-y-2 w-[30%] ">
                    <h2>Settings</h2>
                    <Input name={`workout[${0}][settings][sessionName]`} label="Session Name" />
                    <Input name={`workout[${0}][settings][sessionNote]`} label="Session Note" />
                    <Input name={`workout[${0}][settings][type]`} label="Type" />
                  </Box>

                  <div className="text-xl space-y-2 w-[70%]">
                    <h2>Movements</h2>
                    {section?.movements?.map((movement: Movement, index: number) => (
                      <div className="flex gap-2">
                        <div className="w-[60%]">
                          <Input name={`workout[${0}][movements][${0}][movement]`} label="Movement" />
                        </div>
                        <div className="w-[20%]">
                          <Input name={`workout[${0}][movements][${0}][type]`} label="Type" />
                        </div>
                        <div className="w-[20%]">
                          <Input name={`workout[${0}][movements][${0}][duration]`} label="Duration" />
                        </div>
                        <div className="flex items-center mt-6">
                          <MinusCircleIcon className="h-5 w-5 text-red-600" />
                        </div>
                      </div>
                    ))}

                    <Button onClick={() => handleAddMovement(parentIndex, index)} variant={ButtonVariants.Soft}>
                      + Add Movement
                    </Button>
                  </div>
                </Box>
              ))}

              <div>
                <Button onClick={() => handleAddSection(parentIndex)}>+ Generate Section</Button>
              </div>
            </Card>
          ))}
          <Button onClick={handleAddWorkout}>+ Generate Workout</Button>
        </Box>

        {/* Preview */}
        <div className="col-span-1">
          <div className="sticky top-8 space-y-2">
            <Card>
              <h1 className="text-xl">Preview</h1>
            </Card>
            <Card className="overflow-auto h-[600px] space-y-2">
              <h3 className="text-lg">Morning:</h3>
              <div>
                <div>
                  <p className="text-xs text-yellow-500">Condition:</p>
                  <p className="text-sm">
                    <span className="text-orange-500">Coach Note: </span>
                    This is Morning Workout. We are doing this workout in mornings to burn some fat!
                  </p>
                  <div className="px-4 py-2">
                    <p className=""> For Time - 25 min</p>
                    <ul className="list-disc flex flex-col">
                      <li>25 Burpees </li>
                      <li>25 Up Down </li>
                      <li>30sec. Rest </li>
                    </ul>
                  </div>
                </div>

                <div>
                  <p className="text-xs text-yellow-500">Wednesday Run:</p>
                  <p className="text-sm">
                    <span className="text-orange-500">Coach Note: </span>
                    Run with 5k pace
                  </p>
                  <div className="px-4 py-2">
                    <p className=""> For Time - 25 min</p>
                    <ul className="list-disc flex flex-col">
                      <li>750m Run </li>
                      <li>45 Sec. Rest </li>
                    </ul>
                  </div>
                </div>
              </div>
              <hr />
              <h3 className="text-lg">Evening:</h3>
              <div>
                <p className="text-xs text-yellow-500">Core:</p>
                <p className="text-sm">
                  <span className="text-orange-500">Coach Note: </span>
                  Just focus your core! Every fahrenheiter have 6-packs!
                </p>
                <div className="px-4 py-2">
                  <p> 9 Min. EMOM </p>
                  <ul className="list-decimal">
                    <li> 40 Sec. Side Plank Tuck-Up(R) </li>
                    <li>40 Sec. Side Plank Tuck-Up(L) </li>
                    <li> 40 Sec. Superman Hold </li>
                  </ul>
                </div>
              </div>
              <div>
                <p className="text-xs text-yellow-500">Main:</p>
                <p className="text-sm">
                  <span className="text-orange-500">Coach Note: </span>
                  This is Evening Workout. Just do it. Don't push your self to much on db snatch.
                </p>
                <div className="px-4 py-2">
                  <p> 3 Set - 4 min Amprap </p>
                  <ul className="list-disc">
                    <li>5R-5L Tempo One Side Cossack Squat </li>
                    <li>10 Tempo Air-Squat(2020) </li>
                    <li> 10 DB Goblet Cossack Squat </li>
                    <li> 1 Min Rest </li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
      <Button type="submit">Save</Button>
    </>
  );
};
export default Workout;
