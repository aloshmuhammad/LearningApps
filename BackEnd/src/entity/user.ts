
const user=(user:{firstName:string,lastName:string,phoneNo:string,email:string,password:string,confirmPassword:string})=>{
return{
    getFirstName:()=>user?.firstName,
    getLastName:()=>user?.lastName,
    getEmail:()=>user?.email,
    getPhoneNumber:()=>user?.phoneNo,
    getPassword:()=>user?.password,
    getConfirmPassword:()=>user?.confirmPassword
    
}
}
export default user
export type UserEntity=ReturnType<typeof user>
