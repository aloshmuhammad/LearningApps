import { Server } from "socket.io";
import Authcontroller from "../../../Adapters/controllers/Authcontroller";
import { UserRepositoryMongo, userRepositoryMongo } from "../../database/mongodb/repositories/AuthRepo";
import { authInterface } from "../../../application/services/authInterface";
import { authInter } from "../../../application/repositories/authRepo";
import { authService } from "../../service/AuthService";
import { adminRepoImpl } from "../../database/mongodb/repositories/AdminRepoImpl";
import { adminRepoInter } from "../../../application/repositories/adminRepoInter";
import { tutorrepoimpl } from "../../database/mongodb/repositories/TutorRepImpl";
import { tutorrepointer } from "../../../application/repositories/tutorRepo";
let io

const studentSocket: Record<string, string> = {}; // Type Record<string, string> indicates studentId (string) to socketId (string) mapping
const tutorSocket: Record<string, string> = {};

async function initializeSocket (server:any) {
    const controller=Authcontroller(userRepositoryMongo,authInter,authService,authInterface,adminRepoInter,adminRepoImpl,tutorrepoimpl,tutorrepointer)
    io = new Server(server,{
       cors : {
         origin : 'http://localhost:3000',
         methods: ["GET", "POST"],
     
       }
     })


     io.on('connection', (socket) => {
        console.log('A user connected',socket.id);

        socket.on('studentMessage',(studentId) => {
            console.log(studentId,'dd')
            studentSocket[studentId] = socket.id
        })
        socket.on('tutorMessage',(tutorId)=>{
            tutorSocket[tutorId]=socket.id
        })
       
        socket.on('join room',(commonId) => {
           
            socket.join(commonId)
        })


        socket.on('sendMessage',async(message)=>{
           console.log('send',message)
       
            
    
            await controller.messageSave(message)
           const id = tutorSocket[message.reciever]
            socket.to(message.commonId).emit('recieveMessage',message)
            
            
            socket.on('disconnect', () => {
                // Handle user disconnect
                console.log('A user disconnected:', socket.id);
              });
            
            
        })
      












    })


}
export default initializeSocket
