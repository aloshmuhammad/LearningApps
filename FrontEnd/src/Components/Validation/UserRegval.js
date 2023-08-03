import * as Yup from 'yup';

const SignupSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  lastName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  phoneNo: Yup.string()
    .min(10, 'Enter Valid Numbers')
    .matches(/^[0-9]{10}$/, 'Phone number must be 10 digits'),
  email: Yup.string()
    .required('Required')
    .matches(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/, 'Enter Valid Email address'),
  password: Yup.string()
    .required('Required')
    .min(6, 'Too Short!')
    .max(20, 'Too Long!')
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/,
      'Password must contain at least one letter, one number, and one special character'
    ),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .nullable()
    .required('Confirm password is required'),
});

export default SignupSchema;
