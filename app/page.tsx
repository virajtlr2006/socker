'use client'

import { useEffect } from "react";
import { io } from "socket.io-client";

const page = () => {

  const socket = io("http://localhost:8080");

  useEffect(() => {
    // client-side
    socket.on("connect", () => {
      console.log(socket.id); // x8WIv7-mJelg7on_ALbx
    });
    socket.on("hi",async (data:any) => {
      console.log(data);
      
    })
  }, [])


  return (
    <div>page</div>
  )
}

export default page