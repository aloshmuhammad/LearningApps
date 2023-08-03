import * as Yup from 'yup';
const signinSchema=Yup.object().shape({
    email:Yup.string()
    .required('Required')
    .matches(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/, 'Enter Valid Email address'),
    password:Yup.string()
    .required('Required')
    .min(6, 'Too Short!')
    .max(20, 'Too Long!')
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/,
      'Password must contain at least one letter, one number, and one special character'
    ),
})
export default signinSchema