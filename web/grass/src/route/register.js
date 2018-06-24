// import SigninPage from '../component/signin'

// import "antd/dist/antd.css";

import SigninPage from '../component/loginAndSignUp/login';
import Register from "../component/loginAndSignUp/register";
import RegisterPageFirst from '../component/register/registerPageFirst'
import ForgetPassword from '../component/ForgetPassword'
import ResetPassword from '../component/register/resetPassword'

const rootRoutes = [{
    path: '/forgetPassword',
    component: ForgetPassword
  },{
    path: '/resetPassword',
    component: ResetPassword
  },{
    path: '/registerPageFirst',
    component: RegisterPageFirst
  },{
    path: '/register',
    component: Register
  },{
    path: '*',
    component: SigninPage
  }]

export {
  rootRoutes
}

