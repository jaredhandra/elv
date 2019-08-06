
import request from './request'

export default {
  getUserAuthURL () {
    return request.get('login')
  },

  refreshToken (refresh_token) {
    return request.get(`refresh_token?refresh_token=${refresh_token}`)
  }
}
