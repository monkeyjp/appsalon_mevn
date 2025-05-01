import { parse, formatISO, startOfDay, endOfDay, isValid } from 'date-fns'
import Appointment from '../models/Appointment.js'
import { validateObjectId, handleNotFoundError, formatDate } from "../utils/index.js";
import { sendEmailNewAppointment, sendEmailUpdateAppointment, sendEmailCancelledAppointment } from '../emails/appointmentEmailService.js';



const createAppointment = async (req, res) => {

    const appointment = req.body
    appointment.user = req.user._id.toString()

    try {
        const newAppointment = new Appointment(appointment)
        const result = await newAppointment.save()
        await sendEmailNewAppointment({
            date: formatDate(result.date),
            time: result.time
        })
        return res.json({
            msg: "Your appointment has been successfully scheduled."
        })
    } catch (error) {
        console.log(error);

    }
}

const getAppointmentsByDate = async (req, res) => {
    const { date } = req.query

    const newDate = parse(date, 'dd/MM/yyyy', new Date())

    if (!isValid(newDate)) {
        const error = new Error('Invalid Date')
        return res.status(400).json({ msg: error.message })
    }

    const isoDate = formatISO(newDate)

    const appointments = await Appointment.find({
        date: {
            $gte: startOfDay(new Date(isoDate)),
            $lte: endOfDay(new Date(isoDate))
        }
    }).select('time')

    res.json(appointments)
}

const getAppointmentById = async (req, res) => {
    const { id } = req.params
    //validate object id
    if (validateObjectId(id, res)) return
    //validate exist
    const appointent = await Appointment.findById(id).populate('services')
    if (!appointent) {
        return handleNotFoundError(res, "Appointment not found")
    }

    if (appointent.user.toString() !== req.user._id.toString()) {
        const error = new Error("Access denied")
        return res.status(403).json({ msg: error.message })
    }
    //return appointment
    res.json(appointent)
}

const updateAppointment = async (req, res) => {
    const { id } = req.params
    //validate object id
    if (validateObjectId(id, res)) return
    //validate exist
    const appointent = await Appointment.findById(id).populate('services')
    if (!appointent) {
        return handleNotFoundError(res, "Appointment not found")
    }

    if (appointent.user.toString() !== req.user._id.toString()) {
        const error = new Error("Access denied")
        return res.status(403).json({ msg: error.message })
    }

    const { date, time, totalAmount, services } = req.body
    appointent.date = date
    appointent.time = time
    appointent.totalAmount = totalAmount
    appointent.services = services

    try {
        const result = await appointent.save()
        await sendEmailUpdateAppointment({
            date: formatDate(result.date),
            time: result.time
        })
        res.json({
            msg: 'Appointment successfully updated'
        })
    } catch (error) {
        console.log(error);

    }
}

const deleteAppointment = async (req, res) => {
    const { id } = req.params
    //validate object id
    if (validateObjectId(id, res)) return
    //validate exist
    const appointent = await Appointment.findById(id).populate('services')
    if (!appointent) {
        return handleNotFoundError(res, "Appointment not found")
    }

    if (appointent.user.toString() !== req.user._id.toString()) {
        const error = new Error("Access denied")
        return res.status(403).json({ msg: error.message })
    }

    try {
        await appointent.deleteOne()


        await sendEmailCancelledAppointment({
            date: formatDate(appointent.date),
            time: appointent.time
        })
        res.json({ msg: "Appointment successfully deleted" })
    } catch (error) {
        console.log(error);

    }
}

export {
    createAppointment, getAppointmentsByDate, getAppointmentById, updateAppointment, deleteAppointment
}