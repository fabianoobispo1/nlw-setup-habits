import {FastifyInstance} from "fastify";
import {z} from 'zod'
import { prisma } from "./lib/prisma";
import dayjs from 'dayjs'
export async function appRoutes(app:FastifyInstance) {


    app.post('/habits', async (request) => {
        const createHabitBody = z.object({
            title: z.string(),
            weekDays: z.array(z.number().min(0).max(6))
        })



        const { title, weekDays } =createHabitBody.parse(request.body)


        const today = dayjs().startOf('day').toDate()


        await prisma.habit.create({
            data: {
                title,
                created_ad: today,
                weekDays: {
                    create: weekDays.map(weekDay => {
                        return {
                           week_day: weekDay 
                        }
                    })
                }
            }
        })
    })

    app.get('/day', async (request) => {
    const getDayParams = z.object({
        date: z.coerce.date()
    })

    const { date } =getDayParams.parse(request.query)

    const parseDate = dayjs(date).startOf('day')
    const weekday = parseDate.get('day')

    const posiblehabts = await prisma.habit.findMany({
        where: {
            created_ad: {
                lte: date,
                
            },
            weekDays: {
                some: {
                    week_day: weekday,
                }
            }
           
        }
    })

    const day = await prisma.day.findUnique({
        where: {
            date: parseDate.toDate()
        },
        include: {
            dayHabits: true
        }
    })

    const completedHabits = day?.dayHabits.map(dayHabit => {
        return dayHabit.habit_id
    }) ?? []



    return {posiblehabts, completedHabits}
    
    })

    app.patch('/habits/:id/toggle', async (request) => {
        const toggleHabitParams = z.object({
            id: z.string().uuid()
        })

        const { id } = toggleHabitParams.parse(request.params)

        const today = dayjs().startOf('day').toDate()

        let day = await prisma.day.findUnique({
                where: {
                    date: today,
                }
        })

        if (!day) {
            day = await prisma.day.create({
                data: {
                    date: today
                }
            })
        }

        const dayHabit = await prisma.dayHabit.findUnique({
            where: {
                day_id_habit_id: {
                    day_id: day.id,
                    habit_id: id
                }
            }
        })

        if(dayHabit) {
            //remover a marcacao de completo
            await prisma.dayHabit.delete({
                where:{
                    id: dayHabit.id,
                }
            })
        }else{
            //cmpletar o habito
            await prisma.dayHabit.create({
                data:{
                    day_id: day.id,
                    habit_id: id
                }
            })
        }


      



    
    })

    app.get('/summary', async () => {
        const summary = await prisma.$queryRaw`
            SELECT 
                D.id, 
                D.date,
                (
                    SELECT
                        cast(count(*) as float) 
                    FROM day_habits DH
                    where DH.day_id = D.id
                ) as completed,
                (
                    SELECT
                        cast(count(*) as float) 
                    FROM habit_week_days HWD
                    JOIN habits H
                        on H.id = HWD.habit_id
                    where 
                        HWD.week_day = cast( strftime('%w', D.date/1000.0, 'unixepoch') as int)
                        and H.created_ad <= D.date
                ) as amount                
            FROM days D

        `
      
    
        return summary
        
    })
}