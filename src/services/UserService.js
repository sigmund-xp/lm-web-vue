import backend from "@/backend";
  
class UserService {
  static getUserInfo(token) {
    return backend.post('/api/v1/user/info', {}, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  }

  static createUser(user, token) {
    return backend.post('/api/v1/user', user, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  }
}

export default UserService