import {Plus,Medal, X} from 'phosphor-react'
import * as Dialog from '@radix-ui/react-dialog';
import { useState } from 'react'
import logoImage from '../../assets/logo.svg'
import { NewHabitForm } from '../NewHabitForm';
import { NewexerciseForm } from '../NewexerciseForm';


interface HeaderProps {
  screen: string,
  onScreenChanged: (screen : string) => void
  
}

export function HeaderMobile({onScreenChanged, screen}:HeaderProps){ 
 
  function handleScreenChanged(){
  
   if(screen == 'habitos'){
    onScreenChanged('treino')
   }else{
    onScreenChanged('habitos')
   }
   
  }

    return (
        <div className="w-full max-w-3xl mx-auto flex items-center justify-between">
        

          <button 
            onClick={handleScreenChanged}
            className="border border-violet-500 font-semibold rounded-lg px-4 py-4 flex items-center gap-3 hover:border-violet-200 transition-colors focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-offset-2 focus:ring-offset-background"
          >
          {screen == 'habitos'? 
          <>
          <Medal size={20} className="text-violet-500"/>
            Treino
          </>                    
          :
          <>
          <Medal size={20} className="text-violet-500"/>
            Hàbitos
          </>  
          
          }
         
          </button>
        
        <Dialog.Root>
          <Dialog.Trigger 
            type="button"
            className="border border-violet-500 font-semibold rounded-lg px-4 py-4 flex items-center gap-3 hover:border-violet-200 transition-colors focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-offset-2 focus:ring-offset-background"
          >
          <Plus size={20} className="text-violet-500"/>
          {screen == 'habitos'? 
            <>
            Novo hàbito
            </>          
            :
            <>
            Adicionar exercício
            </>
          }
          </Dialog.Trigger>

          <Dialog.Portal>
            <Dialog.Overlay className='w-screen h-screen bg-black/80 fixed inset-0' />
            <Dialog.Content className='absolute p-10 bg-zinc-900  rounded-2xl w-full max-w-md top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' >
              <Dialog.Close className='absolute right-6 top-6 text-zinc-400 rounded-lg hover:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-offset-2 focus:ring-offset-zinc-900'>
                <X size={24} aria-label="Fechar" />
              </Dialog.Close>
            
              {screen == 'habitos'? 
                <>
                  <Dialog.Title className='text-3xl leading-tight font-extrabold '>
                    <>Criar hábito</>
                  </Dialog.Title>
                  <NewHabitForm />   
                </>    
                :
                <>
                  <Dialog.Title className='text-3xl leading-tight font-extrabold '>
                    <>Criar exercício</>
                  </Dialog.Title>
                  <NewexerciseForm />   
                </>         
              }
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>

       

      </div>

    )
}