import React from 'react'
import { useState } from 'react'

const AiChat = () => {

    const [isOpen,setIsOpen]=useState(false);
    const [message,setMesssage]=useState('')
    const [chatHistory,setChatHistory]=useState([])
    const [loading,setLoading]=useState(false)


    const handleSendMessage=async(e)=>{
        e.preventDefault()
    if(message===""){
        return;
    }
    const userMessage = {role:user,parts:[{text:message}]}
    const newHistory = [...chatHistory,userMessage];
    setChatHistory(newHistory);
    setMesssage('')
    setLoading(true)
        try {
            const response=await axios.post('http://localhost:5100/api/chat',{
                method:'POST',
                header:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({message:message,istory:chatHistory})
            })
            const datas= await response.json()

            const aiMessage={role:'model',parts:[{text:data.data}]}
            setChatHistory([...newHistory,aiMessage])
            
        } catch (error) {
            console.error("error",error)
        } finally{
            setLoading(false)
        }
    }
  return (
   <>
   <button onClick={()=>setIsOpen(!isopen)}>
    {isOpen?"Close Chat":"Open Chat"}
   </button>
   
   </>
  )
}

export default AiChat