import { string0To1000 } from 'aws-sdk/clients/customerprofiles'
import dotenv from 'dotenv'
dotenv.config()
const configKeys={
    Jwt_Secret:process.env.JWT_SECRET as string,
    Fire_BaseApi:process.env.FIRE_BASEAPI as string,
    Fire_BaseAuth:process.env.FIRE_BASEAUTH as string,
    Fire_BaseProjectId:process.env.FIRE_BASEPROJECTID as string,
    Fire_BaseBucket:process.env.FIRE_BASEBUCKET as string,
    Fire_BaseMessagingSenderId:process.env.FIRE_BASEMESSAGINGSENDERID as string,
    Fire_BaseAppId:process.env.FIREBASE_APPID as string,
    Fire_BaseMeasurementId:process.env.FIREBASEMEASUREMENTID as string,
    AccessKeyId:process.env.ACCESSKEY_S3 as string,
    AccessKeySecret:process.env.SECRETACCESS_S3 as string
}

export default configKeys