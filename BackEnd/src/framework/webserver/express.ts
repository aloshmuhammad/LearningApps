import express,{Application,NextFunction} from 'express'
import Helmet from 'helmet'
import cors from 'cors'
import  morgan from 'morgan';
import fileUpload from 'express-fileupload'


import cookieParser from 'cookie-parser'
const expressConfig=(app:Application)=>{
app.use(Helmet())
app.use(cors())
app.use(fileUpload());
app.use(morgan('dev'))

app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

}
export default expressConfig