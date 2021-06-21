const USER_API = {
  REGISTER: '/users/register',
  LOG_IN: '/users/login',
  LP_TOKEN_LOG_IN: '/users/lptoken-login',
  LOG_OUT: '/users/logout',
  FORGOT_PASSWORD: '/users/reset-password',
  UPDATE_PROFILE: '/users/profile/update',
  CHECK_EMAIL: '/users/checkEmailExists',
  UPDATE_PASSWORD: '/users/update-password',
  ACCOUNT_PLAN: '/transaction/promotion',
  CANCEL_PROMOTION: '/transaction/cancel-promotion',
  SEND_CONTACT_EMAIL: '/users/send-contact-email'
}

module.exports = USER_API
