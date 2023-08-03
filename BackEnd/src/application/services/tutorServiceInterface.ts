import { TutorServiceReturn } from "../../framework/service/TutorService";
export const tutorServiceInterface=(service:TutorServiceReturn)=>{
    const verifyToken=async(Token:{token:string})=>await service.verifyToken(Token)
    return{verifyToken}
}
export type TutorServiceInterface=typeof tutorServiceInterface