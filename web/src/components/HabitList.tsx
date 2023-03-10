import * as Checkbox from '@radix-ui/react-checkbox';
import dayjs from 'dayjs';
import { Check } from 'phosphor-react';
import { useEffect, useState } from 'react';
import { api } from '../lib/axios';

interface HabitListProps {
    date: Date;
    onCompletedChanged: (completed : number) => void
}

interface HabitInfo {
    posiblehabts: {
        id: string;
        title: string;
        created_ad: string
    }[],
    completedHabits: string[]
}
export function HabitList({ date, onCompletedChanged} : HabitListProps){
    const [habitInfo, setHabitInfo] = useState<HabitInfo>()
    useEffect(() => {
        api.get('day', {
            params: {
                date: date.toISOString()
            }
        }).then(Response => {
            setHabitInfo(Response.data)
        })
    },[])

    async function handleToggleHabit(habitId: string) {
        await api.patch(`/habits/${habitId}/toggle`)

        const ishabitalreadyCompleted = habitInfo?.completedHabits.includes(habitId)

        let completedHabits: string[] = []

        if(ishabitalreadyCompleted) {
            completedHabits = habitInfo!.completedHabits.filter(id => id!== habitId)
        }else{
            completedHabits = [...habitInfo!.completedHabits, habitId]
        }

        setHabitInfo({
            posiblehabts: habitInfo!.posiblehabts,
            completedHabits
        })
        onCompletedChanged(completedHabits.length)
        
    }

    const isDateInPast = dayjs(date).endOf('day').isBefore(new Date())

    return (
        <div className='mt-6 flex flex-col gap-3'>
            {habitInfo?.posiblehabts.map(habit => {
                return (    
                    <Checkbox.Root 
                        key={habit.id}
                        onCheckedChange={() => handleToggleHabit(habit.id)}
                        checked={habitInfo.completedHabits.includes(habit.id)}
                        disabled={isDateInPast}
                        className='flex items-center gap-3 group focus:outline-none disabled:cursor-not-allowed'
                    >
                    <div className='h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-50 transition-colors  group-focus:ring-2 group-focus:ring-violet-600 group-focus:ring-offset-2 group-focus:ring-offset-background'>
                        <Checkbox.Indicator>
                            <Check size={20} className="text-white" />
                        </Checkbox.Indicator>
                    </div>
                    <span className='font-semibold text-xl text-white leading-tight group-data-[state=checked]:line-through group-data-[state=checked]:text-zinc-400'>
                        {habit.title}
                    </span>
                </Checkbox.Root>  
                )   
               
            })}
                             
        </div>
    )
}