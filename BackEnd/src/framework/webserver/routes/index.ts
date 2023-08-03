import { Application} from "express";
import Authreg from "./auth";
import adminManage from "./Admin/adminMange";
import tutorManage from "./tutor/tutorManage";


 const routes=(app:Application)=>{

app.use('/auth',Authreg())
app.use('/admin',adminManage())
app.use('/tutor',tutorManage())
    



}
export default routes