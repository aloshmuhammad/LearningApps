 import { Server } from "http"
 import config from "../../config/config"
 const serverConfig=(server:Server)=>{
  const startServer=()=>{
   server.listen(config.PORT,()=>{
    console.log(`Server listening on Port ${config.PORT}`)
   })
  }
  return {startServer}
}
export default serverConfig