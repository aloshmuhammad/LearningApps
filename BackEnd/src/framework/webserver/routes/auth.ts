import express from 'express'
import Authcontroller from '../../../Adapters/controllers/Authcontroller'
import {userRepositoryMongo} from '../../database/mongodb/repositories/AuthRepo'
import {authInter} from '../../../application/repositories/authRepo'
import { authService } from '../../service/AuthService'
import { authInterface } from '../../../application/services/authInterface'
import { adminRepoImpl } from '../../database/mongodb/repositories/AdminRepoImpl'
import { adminRepoInter } from '../../../application/repositories/adminRepoInter'
import { tutorrepoimpl } from '../../database/mongodb/repositories/TutorRepImpl'
import { tutorrepointer } from '../../../application/repositories/tutorRepo'
import {Authentication} from '../middlewares/Authentication'
const  Authreg=()=>{
    

const router =express.Router()
const controller=Authcontroller(userRepositoryMongo,authInter,authService,authInterface,adminRepoInter,adminRepoImpl,tutorrepoimpl,tutorrepointer)

router.post('/usersignup',controller.registerUser)
router.post('/googlesignup',controller.googlesignup)
router.post('/userlogin',controller.userLogin)
router.post('/googleSignin',controller.googleSignin)
router.post('/admin-login',controller.adminSignin)
router.post('/tutor-login',controller.tutorSignin)
router.post('/phone-no',controller.verifyPhone)
router.get('/get-Course',Authentication as any,controller.getCourses)
router.get('/course/:courseId',Authentication as any,controller.singleCourse)
router.post('/capture-order',Authentication as any,controller.RazorPayment)
router.post('/verify-payment',Authentication as any,controller.VerifyPay)
router.get('/my-courses/:userId',Authentication as any,controller.myCourses)
router.get('/get-profile/:userId',Authentication as any,controller.myProfile)
router.put('/profile-edit',Authentication as any,controller.editProfile)
router.get('/search-item' ,controller.searchFn)
router.get('/tutors-list/:userId',Authentication as any,controller.myTutors)
router.get('/get-message/:cId',controller.getMessages)
router.get('/get-assignment/:userId',Authentication as any,controller.getAssignment)
router.get('/check-user/:token',Authentication as any,controller.checkUser)
router.post('/submit-assignment',controller.submitAss)




return router
}

export default Authreg