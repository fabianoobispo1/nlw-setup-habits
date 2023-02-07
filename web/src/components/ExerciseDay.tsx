import * as Popover from '@radix-ui/react-popover';
import * as Dialog from '@radix-ui/react-dialog';
import clsx from 'clsx';
import { ProgressBar } from './ProgressBar';
import {Plus,Medal, X} from 'phosphor-react'
import dayjs from 'dayjs';
import { HabitList } from './HabitList';
import { useEffect,useState } from 'react';
import { api } from '../lib/axios';
import { ExerciseInfo } from './ExerciseInfo';

export interface HabitDayProps {
  exercise_id: string
	title:  string
	repetition: number
	charge: number
	video_link: string
	description: string
  }

 export function ExerciseDay({exercise_id, title, repetition, charge, video_link, description}: HabitDayProps) {      
 
  
    return (
        <Dialog.Root>
          <Dialog.Trigger 
            type="button"
            className="w-10 h-10  border-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-offset-2 focus:ring-offset-background bg-violet-500 border-violet-400"
          >
       

           
          </Dialog.Trigger>

          <Dialog.Portal>
            <Dialog.Overlay className='w-screen h-screen bg-black/80 fixed inset-0' />
            <Dialog.Content className='absolute p-10 bg-zinc-900  rounded-2xl w-full max-w-md top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' >
              <Dialog.Close className='absolute right-6 top-6 text-zinc-400 rounded-lg hover:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-offset-2 focus:ring-offset-zinc-900'>
                <X size={24} aria-label="Fechar" />
              </Dialog.Close>
            
                <Dialog.Title className='text-3xl leading-tight font-extrabold '>
                    <>{title}</>
                  </Dialog.Title>
                  <ExerciseInfo 
                   exercise_id={exercise_id}
                   title={title}
                   charge={charge}
                   description={description}
                   repetition={repetition}
                   video_link={video_link}
                  />
          
               
            
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>

    )
}