'use client'

import { useCurrentUser } from "@/hooks/userHooks";
import { log } from "console";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { toast, Toaster } from "sonner";

// Typd
export interface Message {
  msg: string;
  email: string;
}
const page = () => {

  // Fetc email from hooks
  const { email, isLoaded } = useCurrentUser()

  // Set Chat Data
  const [recData, setRecData] = useState<Message[] | null>(null);

  // Reset data
  const [data, setData] = useState("");

  // Socket Connection
  const socket = io("http://localhost:8080")

  // 
  useEffect(() => {
    // Connection checked
    socket.on("connect", async () => {
      console.log(socket.id)
    })
    // set previous chats
    socket.on("chat", async (data: any) => {
      console.log(data)
      setRecData(prev => prev ? [...prev, data] : [data])
    })
    socket.on("notification", async (data: any) => {
      console.log(data);
      if (email != data.email) {
        toast(data.title, {
          description: data.msg,
        })
      }

    })
  }, [])

  // Send the message
  const EmitData = async () => {
    socket.emit("chat", {
      "msg": data, email
    })
    // After send the input field is set empty
    setData("")
  }


  return (
    <div>
      <input value={data} type="text" placeholder="enter msg" onChange={(e) => setData(e.target.value)} />
      <button onClick={EmitData}>Send</button>
      {recData && recData.map((d) =>

        <div key={d.email}>{d.msg} ----  {d.email}</div>
      )}
      <Toaster />
    </div>
  )
}

export default page