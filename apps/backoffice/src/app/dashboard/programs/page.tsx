import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';

export default function Programs() {
  return (
    <div className="flex-1 flex-grow overflow-auto">
      <div className="py-4 px-5">
        <div className="my-2">
          <Button variant={'outline'} size={'sm'} className=" flex border-2 rounded bg-transparent text-white p-2">
            New Program
          </Button>
        </div>
        <div className="my-8 space-y-8">
          <div className=" space-y-3">
            <div className="flex space-x-4 items-center">
              <h4 className="text-lg flex items-center text-gray-300">John Doe's Org</h4>
            </div>
            <ul className="mx-auto grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
              <li className="col-span-1 text-white">
                <Link href="/home">
                  <div className="group relative text-left border border-panel-border-light rounded-md py-4 px-6 transition ease-in-out duration-150 h-32 cursor-pointer hover:bg-gray-700">
                    <div>
                      <h5>Program A</h5>
                      <p className="my-2 text-sm">Crossfit 101</p>
                    </div>
                  </div>
                </Link>
              </li>
              <li className="col-span-1 text-white">
                <Link href="/home">
                  <div className="group relative text-left border border-panel-border-light rounded-md py-4 px-6 transition ease-in-out duration-150 h-32 cursor-pointer hover:bg-gray-700">
                    <div>
                      <h5>Program B</h5>
                      <p className="my-2 text-sm">Crossfit 201</p>
                    </div>
                  </div>
                </Link>
              </li>
              <li className="col-span-1 text-white">
                <Link href="/home">
                  <div className="group relative text-left border border-panel-border-light rounded-md py-4 px-6 transition ease-in-out duration-150 h-32 cursor-pointer hover:bg-gray-700">
                    <div>
                      <h5>Program C</h5>
                      <p className="my-2 text-sm">Crossfit 301</p>
                    </div>
                  </div>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
