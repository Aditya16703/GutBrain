import './App.css'
import {Button } from './components/Button'
import {PlusIcon} from './icons/Plusicon'
import {ShareIcon} from './icons/Shareicon'

function App() {
  return (
    <>
     <Button 
        variant = {"primary"}
        startIcon = {<PlusIcon size = {"lg"}/>}
        endIcon = {<ShareIcon size = {"lg"}/>}
        size = {"lg"}
        title = {"Share"}
     ></Button>
      
    </>
  )
}

export default App
