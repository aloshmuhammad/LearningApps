import asyncHandler from 'express-async-handler'
import { Request,Response,NextFunction } from "express"
import { Tutorrepointer } from '../../application/repositories/tutorRepo'
import { Tutorrepoimpl } from '../../framework/database/mongodb/repositories/TutorRepImpl'
import fs from 'fs'
import AWS, { S3 } from 'aws-sdk';
import { S3Client } from "@aws-sdk/client-s3"
import { tutorForm, tutorSelectCourse,videoUrlupload,getCourseVideos,tutorBuyCourse,profileEdit,getDetails,addTask } from '../../application/useCases/tutor/tutorAuth'
import configKeys from '../../configkeys'
import { TutorService } from '../../framework/service/TutorService'
import { TutorServiceInterface } from '../../application/services/tutorServiceInterface'
import { TutorApplyInterface } from '../../Types/TutorApplyInterface'
import { fetchMessage } from '../../application/useCases/tutor/tutorAuth'






const tutorManageController=(tutorrepoImplement:Tutorrepoimpl,tutorrepointer:Tutorrepointer,tutorService:TutorService,tutorServiceInterface:TutorServiceInterface)=>{
    const tutorMange=tutorrepointer(tutorrepoImplement())
    const tutorServices=tutorServiceInterface(tutorService())
    const tutorApply=asyncHandler(async(req:Request,res:Response)=>{
        console.log(req.body,'loo')
          
          const tutor:{name:string,address:string,email:string,age:string,highestqualification:string,coverletter:string,resumeurl:string,course:string}=req.body

        if (!req.files || !req.files.certificate) {
             res.status(400).json({ error: 'No file uploaded' });
          }
          const file = (req.files as any).certificate;
          console.log(file,'po')
        //   console.log(file,'lok')
       
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
             try {
                const s3FileLocation = await uploadFileToS3(file);
                console.log('S3 File Location:', s3FileLocation);
               tutor.resumeurl=s3FileLocation
                
                const tutorApp=await tutorForm(tutor,tutorMange)
                res.json(tutorApp)
              } catch (error) {
                console.log('Error uploading file:', error);
                res.status(500).json({ error: 'Error uploading file to S3' });
              }
            

        
    
  
    })
    const tutorCourse=asyncHandler(async(req:Request,res:Response)=>{
          const Token: {token:string}=req.body
          
          

      const Course=  await tutorSelectCourse(tutorMange,tutorServices,Token)
      console.log(Course,'poi')
      res.json({Course})

    })
    const videoUpload=asyncHandler(async(req:Request,res:Response)=>{
      const s3 = new AWS.S3({accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY})
      

      if (req.files) {
        // The user has uploaded a file.
        const file = Array.isArray(req.files.file) ? req.files.file[0] : req.files.file;
        const buffer = file.data;
         
      const courseId=req.body.courseId
      console.log(courseId,'podd')
      if (!file) {
        res.status(400).send('No file uploaded');
      }
      
    const uniqueId = Date.now().toString(); 
    const fileObject = {
      Key: `Video-${courseId}-${uniqueId}.mp4`, 
      Body: file.data
    };
    const uploadParams = {
      Bucket: 'itsmyproject',
      Key: fileObject.Key,
      Body: buffer,
      ACL:'public-read'
    };
    const upload = s3.upload(uploadParams);
    upload.on('httpUploadProgress', (progress) => {
      const progressPercent = Math.round((progress.loaded / progress.total) * 100);
      console.log(`Upload progress: ${progressPercent}%`);
    });
    const uploaded = await upload.promise();

    if (!uploaded.Location) {
      res.status(500).send('Failed to upload video');
    }

     
  
    
          const videoUrl = `https://itsmyproject.s3.ap-south-1.amazonaws.com/${fileObject.Key}`
          console.log(videoUrl,'pk')
          const Url=await videoUrlupload(tutorMange,videoUrl,courseId)
          res.status(200).send({
           message: 'Video Uploaded',
           status:true
          })
        }
         res.send('No files');
        })
        const listVideos=asyncHandler(async(req:Request,res:Response,next:NextFunction)=>{
               console.log(req.body,'oop')
               const {courseId}=req.body
        const videosUrl=await getCourseVideos(tutorMange,courseId)
        res.status(200).send({
          data:videosUrl?.courseVideo
        })
        })
        const getStudents=asyncHandler(async(req:Request,res:Response)=>{
          try{
            const {TutorId}=req.params
           
           
            const buyCourses=await tutorBuyCourse(tutorMange,TutorId)
            res.json(buyCourses)
          }catch(error:any){
                
            res.status(500).json({ message: "An error occurred", error: error.message });
        }
         
         
        })
        const myProfile=asyncHandler(async(req:Request,res:Response)=>{
          try{
              const {TutorId}=req.params
              
              const getProfile=await getDetails(TutorId,tutorMange)
              res.json({getProfile})
              
          }catch(error:any){
                
              res.status(500).json({ message: "An error occurred", error: error.message });
          }
         
      })
        const editProfile=asyncHandler(async(req:Request,res:Response)=>{
          try{
              console.log(req.body,'poi')
              const tutor:{TutorId:string,name:string,address:string,email:string,age:string,profileUrl:string,highestqualification:string}=req.body
              if (!req.files || !req.files.TutorprofilePicture) {
                const updatedData=await profileEdit(tutor,tutorMange)
                res.json({updatedData})
                  // res.status(400).json({ error: 'No file uploaded' });
               }
               const file = (req.files as any).TutorprofilePicture;
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
                         tutor.profileUrl=s3FileLocation
                         const updatedData=await profileEdit(tutor,tutorMange)
                         res.json({updatedData})
      
              
      
          }catch(error:any){
                
              res.status(500).json({ message: "An error occurred", error: error.message });
          }
      })
      const getMessages=asyncHandler(async(req:Request,res:Response)=>{
        try{
           const {Cid}=req.params
            const messages=await fetchMessage(Cid,tutorMange)
            res.json(messages)
        }catch(error:any){
              
            res.status(500).json({ message: "An error occurred", error: error.message });
        }
       
    })
    const getTask=asyncHandler(async(req:Request,res:Response)=>{
      try{
        const {studId}=req.body
        const file = (req.files as any).taskFile;
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
          }
          const s3FileLocation = await uploadFileToS3(file);
          console.log('S3 File Location:', s3FileLocation);
         console.log(s3FileLocation,'po')
         const taskUrl=s3FileLocation
         await addTask(taskUrl,studId,tutorMange)
         res.json({status:true})
      }catch(error:any){
              
        res.status(500).json({ message: "An error occurred", error: error.message });
    }
      
    })
      

    

    return {tutorApply,tutorCourse,videoUpload,listVideos,getStudents,editProfile,myProfile,getMessages,getTask}
}
export default tutorManageController