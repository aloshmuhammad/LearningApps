import * as Yup from 'yup';
const courseSchema=Yup.object().shape({
    title:Yup.string()
        .required('Required')
        .matches(/^[A-Za-z ]+$/,'Enter alphabets only'),
        price:Yup.number()
        .required('Required'),
        Description:Yup.string()
        .required('Required')
        .min(10,'Too Short')
        .max(200,'Maximum limit'),

    
})
export default courseSchema