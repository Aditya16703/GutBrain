import './App.css'
import {useState} from "react"
import {Button } from './components/Button'
import {PlusIcon} from './icons/Plusicon'
import {ShareIcon} from './icons/Shareicon'
import {Card} from './components/Card'
import { CreateContentModel } from './components/CreateContentModel'
import {Sidebar} from './components/Sidebar'

function App() {

  const [modalOpen , setModalOpen] = useState(true)
  
  return  (
 <>
 <div className = " ">  
  <Sidebar/>
<div className = "p-4 ml-72 min-h-screen bg-gray-100  ">
      <CreateContentModel open = {modalOpen}  onClose= { ()=>{
        setModalOpen(false);
      }} />
      <div className='flex gap-2  justify-end-safe pt-2'>
       <Button 
        onClick = { () =>{
          setModalOpen(true) 
        }}
        variant = {"primary"}
        
        startIcon = {<PlusIcon size = {"lg"}/>}
        size = {"md"}
        title = {"Add Content"}
       ></Button>
     
       <Button 
        variant = {"secondary"}
        
        startIcon = {<ShareIcon size = {"lg"}/>}
        size = {"md"}
        title = {"Share Brain"}
       ></Button>
      </div>
   
     <div className = "flex  gap-4 pt-4" >
     <Card  type = "twitter" title = " First Tweet"   link = "https://x.com/ghumare64/status/1989425738723016826"   />

     <Card type = "youtube" title = "Sample Video" link = "https://www.youtube.com/watch?v=490q7dZI20I" />
     </div>
</div>

</div>
    
</>
  )
  
}

export default App
