import { UserRepositoryMongo } from "../../framework/database/mongodb/repositories/AuthRepo"
import { AuthInter } from "../../application/repositories/authRepo"
import { Request,Response } from "express"
import { userSignup } from "../../application/useCases/User/userSignup"
import { AuthService } from "../../framework/service/AuthService"
import { AuthInterface } from "../../application/services/authInterface"
import { userGgle } from "../../application/useCases/User/userSignup"
import { userCheck } from "../../application/useCases/User/userSignup"
import { userGgleSign } from "../../application/useCases/User/userSignup"
import { AdminRepoInter } from "../../application/repositories/adminRepoInter"
import { AdminRepoImpl } from "../../framework/database/mongodb/repositories/AdminRepoImpl"
import { Tutorrepoimpl } from "../../framework/database/mongodb/repositories/TutorRepImpl"
import { Tutorrepointer } from "../../application/repositories/tutorRepo"
import { adminReg } from "../../application/useCases/Admin/adminSignin"
import { tutorLogin } from "../../application/useCases/tutor/tutorAuth"
import { phoneValidate } from "../../application/useCases/User/userSignup"
import { findCourses } from "../../application/useCases/User/userSignup"
import { getCourse } from "../../application/useCases/User/userSignup"
import { orderAdd } from "../../application/useCases/User/userSignup"
import { getMycourse } from "../../application/useCases/User/userSignup"
import { getDetails } from "../../application/useCases/User/userSignup"
import { profileEdit } from "../../application/useCases/User/userSignup"
import { searchItem } from "../../application/useCases/User/userSignup"
import { getCourseTutor } from "../../application/useCases/User/userSignup"
import { saveMessage } from "../../application/useCases/User/userSignup"
import { fetchMessage } from "../../application/useCases/User/userSignup"
import { fetchAssignment } from "../../application/useCases/User/userSignup"
import { checkStatus } from "../../application/useCases/User/userSignup"
import { checkOrder } from "../../application/useCases/User/userSignup"
import { assSubmit } from "../../application/useCases/User/userSignup"
import AWS, { S3 } from 'aws-sdk';
import Razorpay from "razorpay"
import crypto from 'crypto'


import asyncHandler from 'express-async-handler'


const Authcontroller=(authImplement:UserRepositoryMongo,authInterface:AuthInter,
    authServiceImpl:AuthService,
    authServiceInterface:AuthInterface,
    adminRepoInter:AdminRepoInter,
    adminRepoImpl:AdminRepoImpl,
    tutorrepimpl:Tutorrepoimpl,
    tutorrepointer:Tutorrepointer

    
    
    )=>{
const Authdb=authInterface(authImplement())
const Authserv=authServiceInterface(authServiceImpl())
const AuthadDb=adminRepoInter(adminRepoImpl())
const AuthtutorDb=tutorrepointer(tutorrepimpl())
const registerUser=asyncHandler(async(req:Request,res:Response)=>{
    try{
        console.log(req.body);
const user:{firstName:string,lastName:string,phoneNo:string,email:string,password:string,confirmPassword:string}=req.body

 const userToken= await userSignup(user,Authdb,Authserv)
 console.log(userToken,'lava')
 
 res.json({status:'success',
           message:'new user registered',
           userToken
                          })

    
    }catch(error:any){
          
        res.status(500).json({ message: "An error occurred", error: error.message });
    }
    


})
const googlesignup=asyncHandler(async(req:Request,res:Response)=>{
    try{
        const userG:{email:string,firstName:string,imageUrl:string}=req.body
        const userGoogle=await userGgle(userG,Authdb,Authserv)
        console.log(userGoogle,'ggleey')
        res.json({status:'success',
        message:'new user registered',
        userGoogle
                       })
    }catch(error:any){
          
        res.status(500).json({ message: "An error occurred", error: error.message });
    }
    

})
const userLogin=asyncHandler(async(req:Request,res:Response)=>{
    try{
        const userVlid:{email:string,password:string}=req.body
        const validUser=await userCheck(userVlid,Authdb,Authserv)
        res.json(validUser)
    }catch(error:any){
          
        res.status(500).json({ message: "An error occurred", error: error.message });
    }
   

})
const googleSignin=asyncHandler(async(req:Request,res:Response)=>{
    try{
        const usergSign:{email:string}=req.body
        const googleUser=await userGgleSign(usergSign,Authdb,Authserv)
        console.log(googleUser,'usses');
        res.json(googleUser)
    }catch(error:any){
          
        res.status(500).json({ message: "An error occurred", error: error.message });
    }
    
  
})
const adminSignin=asyncHandler(async(req:Request,res:Response)=>{
    try{
        const AdminCred:{email:String,password:String}=req.body
        const Admin=await adminReg(AdminCred,AuthadDb,Authserv)
        res.json(Admin)
    }catch(error:any){
          
        res.status(500).json({ message: "An error occurred", error: error.message });
    }
   
   

})
const tutorSignin=asyncHandler(async(req:Request,res:Response)=>{
    try{
        const tutor:{email:string,password:string}=req.body
        const tutors=await tutorLogin(tutor,AuthtutorDb,Authserv)
        res.json(tutors)
    }catch(error:any){
          
        res.status(500).json({ message: "An error occurred", error: error.message });
    }
   
  
})
const verifyPhone=asyncHandler(async(req:Request,res:Response)=>{
    try{
        const phone: {phoneNumber:string}=req.body
        const validPhone=await phoneValidate(phone,Authdb,Authserv)
        
        res.json({validPhone})
    }catch(error:any){
          
        res.status(500).json({ message: "An error occurred", error: error.message });
    }
 
})
const getCourses=asyncHandler(async(req:Request,res:Response)=>{
    try{
        const allCourses=await findCourses(Authdb)
        res.json({allCourses})
    }catch(error:any){
          
        res.status(500).json({ message: "An error occurred", error: error.message });
    }
 
  
})
const singleCourse=asyncHandler(async(req:Request,res:Response)=>{
    try{
        const courseId=req.params.courseId
        const course=await getCourse(Authdb,courseId)
        res.json({status:200,
                   course})
    }catch(error:any){
          
        res.status(500).json({ message: "An error occurred", error: error.message });
    }
   
})
const RazorPayment=asyncHandler(async(req:Request,res:Response)=>{
    try{
        console.log(req.body,'oppo')
        const {User}=req.body
        const {course}=req.body
        const orderExist=await checkOrder(User,course,Authdb)
        if(orderExist){
            res.json(orderExist)
        }
        var instance = new Razorpay({ key_id: 'rzp_test_PuWlV36hk7Gp53', key_secret: 'Jt87jAYeL41nmg3goQMmK827' })

        var options = {
          amount: req.body.price,  // amount in the smallest currency unit
          currency: "INR",
        
        };
        instance.orders.create(options, function(err, order) {
            if(err){
                res.status(500).json({ message: "An error occurred", error: 'Error occurred during Payment' });
            } else {
                res.status(200).json({ code: 200, data: order });
            }
            console.log(order);
        });
    }catch(error:any){
          
        res.status(500).json({ message: "An error occurred", error: 'Error occured during Payment'});
    }

})
const VerifyPay=asyncHandler(async(req:Request,res:Response)=>{
    try{
        const{data}=req.body

        console.log(data)
        const  key_id= 'rzp_test_PuWlV36hk7Gp53'
        const   key_secret= 'Jt87jAYeL41nmg3goQMmK827'
    
    
        let body=data.razorpay_order_id + '|' + data.razorpay_payment_id
        var expectedSignature=crypto.createHmac('sha256',key_secret).update(body.toString())
        .digest('hex')
        if(expectedSignature===data.razorpay_signature)
        {
            const details={
                courses:data.course._id,
                user:data.user,
                price:data.course.price,
                status:true
            }
             const createOrder=await orderAdd(details,Authdb)
            res.json({code:200,message:'valid signature and',createOrder, status:true})
        }
        else{
               
        res.json({code:500,message:'invalid signature'})
        }
    }catch(error:any){
          
        res.status(500).json({ message: "An error occurred", error: error.message });
    }
   
   
    //  var instance = new Razorpay({ key_id:'rzp_test_PuWlV36hk7Gp53', key_secret: 'Jt87jAYeL41nmg3goQMmK827' })

    //  var { validatePaymentVerification, validateWebhookSignature } = require('./dist/utils/razorpay-utils');
    //  validatePaymentVerification({"order_id": data.razorpay_order_id, "payment_id": data.razorpay_payment_id }, data.razorpay_signature,'Jt87jAYeL41nmg3goQMmK827' );
})
const myCourses=asyncHandler(async(req:Request,res:Response)=>{
    const {userId}=req.params
    const myCourse=await getMycourse(userId,Authdb)
    res.json({code:200,myCourse})
  
})
const myProfile=asyncHandler(async(req:Request,res:Response)=>{
    try{
        const {userId}=req.params
        
        const getProfile=await getDetails(userId,Authdb)
        res.json({getProfile})
        
    }catch(error:any){
          
        res.status(500).json({ message: "An error occurred", error: error.message });
    }
   
})
const editProfile=asyncHandler(async(req:Request,res:Response)=>{
    try{
        console.log(req.body,'poi')
        const user:{UserId:string,firstName:string,lastName:string,phoneNo:string,email:string,profileUrl:string}=req.body
        if (!req.files || !req.files.profilePicture) {
            const updatedData=await profileEdit(user,Authdb)
            res.json({updatedData})
         }
         const file = (req.files as any).profilePicture;
         console.log(file,'po')
         const s3=new AWS.S3({accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,params:{Bucket:'itsmyproject'}})
            const uploadFileToS3 = (fileData:any) => {
                const params = {
                  Bucket: 'itsmyproject',
                  Key: `uploads/${fileData.name}`, // Specify the desired location and filename in S3
                  Body: fileData.data,
                  ACL:'public-read',
                  ContentType: fileData.mimetype,
                };
                return new Promise<string>((resolve, reject) => {
                    s3.upload(params, (err: Error, data: AWS.S3.ManagedUpload.SendData) => {
                      if (err) {
                        console.log(`Error uploading file: ${err}`);
                        reject(err);
                      } else {
                        console.log(`File uploaded successfully. File location: ${data.Location}`);
                        
                        resolve(data.Location);
                      }
                    });
                  });
                };
                
        const s3FileLocation = await uploadFileToS3(file);
          console.log('S3 File Location:', s3FileLocation);
         user.profileUrl=s3FileLocation

        const updatedData=await profileEdit(user,Authdb)
        res.json({updatedData})

    }catch(error:any){
          
        res.status(500).json({ message: "An error occurred", error: error.message });
    }
})
const searchFn=asyncHandler(async(req:Request,res:Response)=>{
    try{
        const searchQuery=req.query.q
      
         const result=await searchItem(searchQuery,Authdb)
         res.json(result)
    }catch(error:any){
          
        res.status(500).json({ message: "An error occurred", error: error.message });
    }
   

})
const myTutors=asyncHandler(async(req:Request,res:Response)=>{
    try{
        const {userId}=req.params
        console.log(req.params,'op')
        const Mytutors=await getCourseTutor(userId,Authdb)
        res.json(Mytutors)
    }catch(error:any){
          
        res.status(500).json({ message: "An error occurred", error: error.message });
    }



})
const messageSave=async(message:{isFrom:string,content:string,reciever:string,from:string,commonId:string})=>{
   
   await saveMessage(message,Authdb)
}
const getMessages=asyncHandler(async(req:Request,res:Response)=>{
    try{
        const {cId}=req.params
      
        const messages=await fetchMessage(cId,Authdb)

        res.json(messages)
    }catch(error:any){
          
        res.status(500).json({ message: "An error occurred", error: error.message });
    }
   
})
const getAssignment=asyncHandler(async(req:Request,res:Response)=>{
    const{userId}=req.params
    const assignment=await fetchAssignment(userId,Authdb)
    res.json(assignment)
})
const checkUser=asyncHandler(async(req:Request,res:Response)=>{
    const{token}=req.params
    const userStatus=await checkStatus(token,Authdb)
    res.json(userStatus)
})
const submitAss=asyncHandler(async(req:Request,res:Response)=>{
  const {tutorId}=req.body
  const file = (req.files as any).file;
         console.log(file,'po')
         const s3=new AWS.S3({accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,params:{Bucket:'itsmyproject'}})
            const uploadFileToS3 = (fileData:any) => {
                const params = {
                  Bucket: 'itsmyproject',
                  Key: `uploads/${fileData.name}`, // Specify the desired location and filename in S3
                  Body: fileData.data,
                  ACL:'public-read',
                  ContentType: fileData.mimetype,
                };
                return new Promise<string>((resolve, reject) => {
                    s3.upload(params, (err: Error, data: AWS.S3.ManagedUpload.SendData) => {
                      if (err) {
                        console.log(`Error uploading file: ${err}`);
                        reject(err);
                      } else {
                        console.log(`File uploaded successfully. File location: ${data.Location}`);
                        
                        resolve(data.Location);
                      }
                    });
                  });
                };
                
        const s3FileLocation = await uploadFileToS3(file);
          console.log('S3 File Location:', s3FileLocation);
          const submitUrl=s3FileLocation
          await assSubmit(tutorId,submitUrl,Authdb)
          res.json({status:true})
})


return {


    submitAss,
    registerUser,
    googlesignup,
    userLogin,
    googleSignin,
    adminSignin,
    tutorSignin,
    verifyPhone,
    getCourses,
    singleCourse,
    RazorPayment,
    VerifyPay,
    myCourses,
    myProfile,
    editProfile,
    searchFn,
    myTutors,
    messageSave,
    getMessages,
    getAssignment,
    checkUser

}
}
export default Authcontroller