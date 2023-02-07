import dayjs from "dayjs"
import { Detective, Key } from "phosphor-react"
import { useEffect, useState } from "react"
import { api } from "../lib/axios"
import { generateDatesFromYearBeginning } from "../utils/generate-dates-from-year-beginning"
import { ExerciseDay } from "./ExerciseDay"
import { HabitDay } from "./HabitDay"

const weekDays = [
  'D',
  'S',
  'T',
  'Q',
  'Q',
  'S',
  'S',
]

const summaryDates = generateDatesFromYearBeginning()

const minimumSummaryDatesSize = 18 * 7 // 18 weeks
const amountOfDaysToFill = minimumSummaryDatesSize - summaryDates.length

export type summaryExercise = {
  id: string;
  exercise_id: string;
  week_day: number;
  title: string;
  repetition: number
	charge: number
	video_link: string
	description: string
}[]

export function SummaryExerciseTable(){
  const [summary, setSummary] = useState<summaryExercise>([])
  console.log(summary)
  useEffect(() =>{
    api.get('summaryExercise').then(response => {
      setSummary(response.data)
    })
    
  },[])


    return (
      <div className="w-full flex flex-col gap-3 ">
        <div className="w-full flex flex-row gap-3">
          <div  className="text-zinc-400 text-xl h-10 w-10 font-bold flex items-center justify-center">
            D
          </div>
            {summary.map((date, i) => {
              if (date.week_day == 1) {
                return(                 
                  <ExerciseDay
                    key={i} 
                    exercise_id={date.exercise_id}
                    title={date.title}
                    charge={date.charge}
                    description={date.description}
                    repetition={date.repetition}
                    video_link={date.video_link}
                  />                  
                )
              }})
            }         
        </div>

        <div className="w-full flex flex-row gap-3">
          <div  className="text-zinc-400 text-xl h-10 w-10 font-bold flex items-center justify-center">
            S
          </div>
            {summary.map((date, i) => {
              if (date.week_day == 2) {
                return(                 
                  <ExerciseDay
                       key={i} 
                    exercise_id={date.exercise_id}
                    title={date.title}
                    charge={date.charge}
                    description={date.description}
                    repetition={date.repetition}
                    video_link={date.video_link}
                  />                  
                )
              }})
            }         
        </div>

        <div className="w-full flex flex-row gap-3">
          <div  className="text-zinc-400 text-xl h-10 w-10 font-bold flex items-center justify-center">
            T
          </div>
            {summary.map((date, i) => {
              if (date.week_day == 3) {
                return(                 
                  <ExerciseDay
                       key={i} 
                    exercise_id={date.exercise_id}
                    title={date.title}
                    charge={date.charge}
                    description={date.description}
                    repetition={date.repetition}
                    video_link={date.video_link}
                  />                  
                )
              }})
            }         
        </div>

        <div className="w-full flex flex-row gap-3">
          <div  className="text-zinc-400 text-xl h-10 w-10 font-bold flex items-center justify-center">
            Q
          </div>
            {summary.map((date, i) => {
              if (date.week_day == 4) {
                return(                 
                  <ExerciseDay
                       key={i} 
                    exercise_id={date.exercise_id}
                    title={date.title}
                    charge={date.charge}
                    description={date.description}
                    repetition={date.repetition}
                    video_link={date.video_link}
                  />                  
                )
              }})
            }         
        </div>

        <div className="w-full flex flex-row gap-3">
          <div  className="text-zinc-400 text-xl h-10 w-10 font-bold flex items-center justify-center">
            Q
          </div>
            {summary.map((date, i) => {
              if (date.week_day == 5) {
                return(                 
                  <ExerciseDay
                       key={i} 
                    exercise_id={date.exercise_id}
                    title={date.title}
                    charge={date.charge}
                    description={date.description}
                    repetition={date.repetition}
                    video_link={date.video_link}
                  />                  
                )
              }})
            }         
        </div>

        <div className="w-full flex flex-row gap-3">
          <div  className="text-zinc-400 text-xl h-10 w-10 font-bold flex items-center justify-center">
            S
          </div>
            {summary.map((date, i) => {
              if (date.week_day == 6) {
                return(                 
                  <ExerciseDay
                       key={i} 
                    exercise_id={date.exercise_id}
                    title={date.title}
                    charge={date.charge}
                    description={date.description}
                    repetition={date.repetition}
                    video_link={date.video_link}
                  />                  
                )
              }})
            }         
        </div>

        <div className="w-full flex flex-row gap-3">
          <div  className="text-zinc-400 text-xl h-10 w-10 font-bold flex items-center justify-center">
            S
          </div>
            {summary.map((date, i) => {
              if (date.week_day == 7) {
                return(                 
                  <ExerciseDay
                       key={i} 
                    exercise_id={date.exercise_id}
                    title={date.title}
                    charge={date.charge}
                    description={date.description}
                    repetition={date.repetition}
                    video_link={date.video_link}
                  />                  
                )
              }})
            }         
        </div>







      </div>

    )
}