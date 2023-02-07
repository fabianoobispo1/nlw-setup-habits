
import { Header } from "./components/Header"
import { HeaderMobile } from "./components/mobile/HeaderMobile"; 
import {isMobile} from 'react-device-detect';
import { SummaryTable } from "./components/SummaryTable"
import './styles/global.css'
import './lib/dayjs'
import { useState } from "react"
import { SummaryExerciseTable } from "./components/SummaryExerciseTable"


export  function App() {
  const [tela, SetTela]= useState('treino')

  function handleScreenChanged(tela: string){
    SetTela(tela)
  }
    
  if (isMobile) {
    return (
      <div className="w-screen h-screen flex justify-center items-start pt-10">
        <div className="w-full max-w-5xl px-6 flex flex-col gap-16">
          <HeaderMobile
            screen={tela}
            onScreenChanged={handleScreenChanged}
          />

          {tela == 'habitos'?
            <SummaryTable />
          :
            <SummaryExerciseTable/>
          }

        </div>      
    </div>
    )


  }else{
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <div className="w-full max-w-5xl px-6 flex flex-col gap-16">

          <Header 
          screen={tela}
          onScreenChanged={handleScreenChanged}/>

          {tela == 'habitos'?
            <SummaryTable />
          :
            <SummaryExerciseTable/>
          }
        </div>
      </div>
    )
  }

}
