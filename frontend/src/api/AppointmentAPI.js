import api from "@/lib/axios";


export default {

    create(data) {
        return api.post('/appointments', data)
    },
    getByDate(date) {
        return api.get(`/appointments?date=${date}`)
    },
    getUserAppointments(userID) {
        return api.get(`/users/${userID}/appointments`)
    },
    getById(id) {
        return api.get(`/appointments/${id}`)
    },
    update(id, data) {
        return api.put(`/appointments/${id}`, data)
    },
    delete(id) {
        return api.delete(`/appointments/${id}`)
    }
}