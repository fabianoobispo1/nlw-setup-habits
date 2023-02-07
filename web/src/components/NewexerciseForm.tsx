import {Check, Plus, X} from 'phosphor-react'
import * as Checkbox from '@radix-ui/react-checkbox';
import * as Dialog from '@radix-ui/react-dialog';
import { FormEvent, useState } from 'react'
import logoImage from '../assets/logo.svg'
import { api } from '../lib/axios';

const availableWeekDays = [
  'Domingo',
  'Segunda-feira',
  'Terça-feira',
  'Quarta-feira',
  'Quinta-feira',
  'Sexta-feira',
  'Sábado',
]

export function NewexerciseForm(){  
  const [title, setTitle] = useState('')
  const [repetition, setRepetition] = useState(0)
  const [charge, setCharge] = useState(0)
  const [videoLink, setVideoLink] = useState('')
  const [description, setDescription] = useState('')
  const [weekDays, setWeekDays] = useState<number[]>([])

  async function createNewHabit(event: FormEvent) {
    event.preventDefault()

     if(!title || weekDays.length === 0) {
      return
    }

    await api.post('CreateExercise', {
      title,
      repetition,
      charge,
      video_link:videoLink,
      description,
      weekDays
    })

    setTitle('')
    setRepetition(0)
    setCharge(0)
    setVideoLink('')
    setDescription('')
    setWeekDays([])

    alert('Exercício adicionado com sucesso!') 
  }

  function handleToggleWeekDay(weekDay: number) {
    if(weekDays.includes(weekDay)) {
      const weekDaysWithRemovedOne = weekDays.filter(day => day !== weekDay)
      setWeekDays(weekDaysWithRemovedOne)
    } else {
      const weekDaysWithAddedOne = [...weekDays, weekDay]
      setWeekDays(weekDaysWithAddedOne)
    }
  }
    return (
      <form className='w-full flex flex-col mt-6' onSubmit={createNewHabit}>
        <label htmlFor='title' className='font-semibold leading-tight'>
          Qual Nome do exercício?
        </label>
        <input
          type="text"
          id="title" 
         /*  placeholder='ex.: Exercicios, dormir bem, etc...' */
          className='p-4 rounded-lg mt-3 bg-zinc-800 text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-offset-2 focus:ring-offset-zinc-900'
          autoFocus
          value={title}
          onChange={event => setTitle(event.target.value)}
        />
        
        <div className='w-2/4 flex flex-row  gap-4'>
          <div className='w-full flex flex-col'>
            <label htmlFor='charge' className='font-semibold leading-tight mt-3'>
              Qual a carga?
            </label>
            <input
              type="number"
              id="charge" 
              /*  placeholder='ex.: Exercicios, dormir bem, etc...' */
              className='p-4 rounded-lg mt-3 bg-zinc-800 text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-offset-2 focus:ring-offset-zinc-900'
              autoFocus
              value={charge}
              onChange={event => setCharge(event.target.valueAsNumber)}
            />        
          </div>

          <div className='w-full flex flex-col'>
            <label htmlFor='repetition' className='font-semibold leading-tight mt-3'>
              Quantas repetiçôes?
            </label>
            <input
              type="number"
              id="repetition" 
             /*  placeholder='ex.: Exercicios, dormir bem, etc...' */
              className='p-4 rounded-lg mt-3 bg-zinc-800 text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-offset-2 focus:ring-offset-zinc-900'
              autoFocus
              value={repetition}
              onChange={event => setRepetition(event.target.valueAsNumber)}
            />
          </div>
        </div>
          
      
        <label htmlFor='description' className='font-semibold leading-tight mt-3'>
          Descriçâo:
        </label>
        <input
          type="text"
          id="description" 
         /*  placeholder='ex.: Exercicios, dormir bem, etc...' */
          className='p-4 rounded-lg mt-3 bg-zinc-800 text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-offset-2 focus:ring-offset-zinc-900'
          autoFocus
          value={description}
          onChange={event => setDescription(event.target.value)}
        />

        <label htmlFor='VideoLink' className='font-semibold leading-tight mt-3'>
          Video:
        </label>
        <input
          type="text"
          id="VideoLink" 
         /*  placeholder='ex.: Exercicios, dormir bem, etc...' */
          className='p-4 rounded-lg mt-3 bg-zinc-800 text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-offset-2 focus:ring-offset-zinc-900'
          autoFocus
          value={videoLink}
          onChange={event => setVideoLink(event.target.value)}
        />
        <label htmlFor='' className='font-semibold leading-tight mt-4'>
          Qual a recorrência?
        </label>

        <div className=' grid grid-cols-3 gap-4 mt-3'>
        {availableWeekDays.map((weekday, index) => {
          return (
            <Checkbox.Root 
              key={weekday} 
              className='flex items-center gap-3 group focus:outline-none'
              checked={weekDays.includes(index)}
              onCheckedChange={() => handleToggleWeekDay(index)}
            >
              <div className='h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-50 transition-colors group-focus:outline-none group-focus:ring-2 group-focus:ring-violet-600 group-focus:ring-offset-2 group-focus:ring-offset-zinc-900'>
                <Checkbox.Indicator>
                  <Check size={20} className="text-white" />
                </Checkbox.Indicator>   
              </div>

              <span className='text-white leading-tight '>
                {weekday}
              </span>
            </Checkbox.Root>      
          )
        })}
                            
        </div>
 


        <button type='submit' className='mt-6 rounded-lg p-4 flex items-center justify-center gap-3 font-semibold bg-green-600 hover:bg-green-500 transition-colors focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-zinc-900'>
          <Check size={20} weight="bold" />
          Confirmar
        </button>
      </form>

    )
}