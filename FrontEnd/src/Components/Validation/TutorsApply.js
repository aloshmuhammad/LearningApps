import * as Yup from 'yup';
const tutorapplySchema=Yup.object().shape({
    name:Yup.string()
      .min(3,'Enter Full Name!')
      .required('Required'),

   age:Yup.number()
      .required('Required'),
   email:Yup.string()
      .required('Required')
      .matches(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/, 'Enter Valid Email address'),

       
   address:Yup.string()
      .min(5,'Too Short Enter Valid Address')
      .required('Required'),
   highestqualification:Yup.string()
      .min(3,'Enter full qualification')
      .required('Required'),
   coverletter:Yup.string()
   .min(10,'Too short')
   .max(1000,'Maximum limit exceeded')
   .required('Required'),
   course:Yup.string()
   .matches(/^[A-Za-z ]+$/,'Enter alphabets only')
   .required('Required')
   



})
export default tutorapplySchema