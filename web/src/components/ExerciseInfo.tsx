import * as Checkbox from '@radix-ui/react-checkbox';
import dayjs from 'dayjs';
import { Check } from 'phosphor-react';
import { useEffect, useState } from 'react';
import { api } from '../lib/axios';
import { HabitDayProps } from './ExerciseDay';



export function ExerciseInfo({exercise_id, title, repetition, charge, video_link, description} : HabitDayProps){
    
    return (
        <div className='w-full flex flex-col mt-6'>
            <label htmlFor='title' className='font-semibold leading-tight'>
                Descricao:
            </label>
            <span className='mt-1 font-semibold text-xl text-white leading-tight group-data-[state=checked]:line-through group-data-[state=checked]:text-zinc-400'>
                {description}
            </span>

            <div className='w-2/2 flex flex-row  gap-4 mt-2'>
                <div className='w-full flex flex-row  gap-2' >
                    <label htmlFor='title' className='font-semibold leading-tight'>
                        Repetições:
                    </label>
                    <span className='font-semibold text-xl text-white leading-tight group-data-[state=checked]:line-through group-data-[state=checked]:text-zinc-400'>
                        {repetition}
                    </span>
                </div>

                <div className='w-full flex flex-row gap-2'>
                    <label htmlFor='title' className='font-semibold leading-tight'>
                        Carga:
                    </label>
                    <span className='font-semibold text-xl text-white leading-tight group-data-[state=checked]:line-through group-data-[state=checked]:text-zinc-400'>
                        {charge}
                    </span>
                </div>
            </div>
            
            
            <label htmlFor='title' className='mt-2 font-semibold leading-tight'>
                Video:
            </label>
            <span className='mt-1 font-semibold text-xl text-white leading-tight group-data-[state=checked]:line-through group-data-[state=checked]:text-zinc-400'>
                {video_link}
            </span>
            
            
            
         

     
        </div>
    )
}