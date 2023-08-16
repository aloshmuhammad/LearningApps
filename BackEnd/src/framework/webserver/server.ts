 import { Server } from "http"
 import initializeSocket from "./Socket/Socket"
 
 import config from "../../config/config"
 
 const serverConfig=(server:Server)=>{
  initializeSocket(server)
  
  const startServer=()=>{
   server.listen(config.PORT,()=>{
    console.log(`Server listening on Port ${config.PORT}`)
   })
  }
  return {startServer}
}
export default serverConfig