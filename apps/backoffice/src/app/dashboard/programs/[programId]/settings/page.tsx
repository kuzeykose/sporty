import { Button } from '@/components/ui/button';
import { ProgramSettings } from '@/constants/Programs.type';
import { getProgram } from '@/services/programs';
import React from 'react';

type ProgramSettingsParams = {
  params: {
    programId: string;
  };
};

export default async function ProgramSettings({ params }: ProgramSettingsParams) {
  const program = await getProgram(params.programId);

  return (
    <div className="w-full h-full space-y-16">
      <div className="space-y-4">
        <div className=" pb-4">
          <h2 className=" text-2xl font-extrabold">Program Settings</h2>
        </div>
        <div className=" space-y-4">
          <div className="border-b border-b-gray-300 pb-4">
            <h4 className=" text-lg font-bold">Information</h4>
          </div>
          <div className=" border-b border-b-gray-100 pb-4 grid grid-cols-4">
            <p className=" col-span-1 text-sm font-bold leading-6 flex items-center">Name</p>
            <div className="col-span-3 flex justify-between items-center">
              <input className="text-sm font-medium leading-6" type="text" value={program.name} disabled />
              <Button size="icon" className="h-6 w-14">
                Edit
              </Button>
            </div>
          </div>
          <div className=" border-b border-b-gray-100 pb-4 grid grid-cols-4">
            <p className=" col-span-1 text-sm font-bold leading-6 flex items-center">Description</p>
            <div className="col-span-3 flex justify-between items-center">
              <input className="text-sm font-medium leading-6" type="text" value={program.description} disabled />
              <Button size="icon" className="h-6 w-14">
                Edit
              </Button>
            </div>
          </div>
          <div className=" border-b border-b-gray-100 pb-4 grid grid-cols-4">
            <p className=" col-span-1 text-sm font-bold leading-6">Status</p>
            <p className=" col-span-3 text-sm font-medium leading-6">{program.status}</p>
          </div>
          <div className=" border-b border-b-gray-100 pb-4 grid grid-cols-4">
            <p className=" col-span-1 text-sm font-bold leading-6">Owner</p>
            <p className=" col-span-3 text-sm font-medium leading-6">{program.owner}</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="space-y-4">
          <div className="border-b border-b-gray-300 pb-4">
            <h4 className=" text-lg font-bold">Settings</h4>
          </div>
          <div className=" border-b border-b-gray-100 pb-4 grid grid-cols-4">
            <p className=" col-span-1 text-sm font-bold leading-6">Id</p>
            <p className=" col-span-3 text-sm font-medium leading-6">{program.id}</p>
          </div>
          <div className=" border-b border-b-gray-100 pb-4 grid grid-cols-4">
            <p className=" col-span-1 text-sm font-bold leading-6">Created At</p>
            <p className=" col-span-3 text-sm font-medium leading-6">{program.createdAt}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
