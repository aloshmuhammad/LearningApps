import express from 'express'
import multer from 'multer';
import {TutorAuthentication} from '../../middlewares/TutorAuthentications';


const upload = multer({ dest: 'uploads/' });
import tutorManageController from '../../../../Adapters/controllers/TutorManage'
import { tutorrepointer } from '../../../../application/repositories/tutorRepo'
import { tutorrepoimpl } from '../../../database/mongodb/repositories/TutorRepImpl'
import { tutorService } from '../../../service/TutorService'
import { tutorServiceInterface } from '../../../../application/services/tutorServiceInterface'

const tutorManage=()=>{
    const router=express.Router()
    const controller=tutorManageController(tutorrepoimpl,tutorrepointer,tutorService,tutorServiceInterface)
 
    
    router.post('/tutor-form',controller.tutorApply)
    router.post('/get-course',TutorAuthentication as any,controller.tutorCourse)
    router.post('/add-video',TutorAuthentication as any,controller.videoUpload)
    router.post('/view-classes',TutorAuthentication as any,controller.listVideos)
   
    router.get('/get-profile/:TutorId',TutorAuthentication as any ,controller.myProfile)
    router.put('/profile-edit',TutorAuthentication as any,controller.editProfile)
    router.get('/buyed-Course/:TutorId',TutorAuthentication as any,controller.getStudents)
    router.get('/get-message/:Cid',controller.getMessages)
    router.post('/task',TutorAuthentication as any,controller.getTask)
    




    return router
}
export default tutorManage