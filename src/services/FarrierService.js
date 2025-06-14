import backend from "@/backend";
  
class FarrierService {

  static getFarrier(id, token) {
    return backend.get(`/api/v1/farrier/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  }

  static getListFarriers(token) {
    return backend.post('/api/v1/farrier/list', {}, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  }

  static createFarrier(farrier, token) {
    return backend.post('/api/v1/farrier', farrier, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  }

  static modifyFarrier(id, data, token) {
    return backend.patch(`/api/v1/farrier/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  }

  static deleteFarrier(id, token) {
    return backend.delete(`/api/v1/farrier/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  }

}

export default FarrierService
