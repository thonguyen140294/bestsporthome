import Constant from '../helper/constant';
const initState = {
  isLogin: false
}
const registration = (state = initState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, isLogin: true };
    case 'LOGOUT':
      return { ...state, isLogin: false };
    case Constant.REGISTER_FAILURE:
      return {};
    default:
      return state
  }
}

export default registration