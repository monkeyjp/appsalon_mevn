import { parse, parseISO, format } from "date-fns";

export function convertToISO(strDate) {
    const date = parse(strDate, 'dd/MM/yyyy', new Date())
    return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())).toISOString()
}

export function displayDate(date) {
    const newDate = parseISO(date)
    const formattedDate = format(newDate, 'PPPP')
    return formattedDate
}

export function converToDDMMYYYY(isoDate) {
    const newDate = new Date(isoDate)
    const formattedDate = format(newDate, 'dd/MM/yyyy')
    return formattedDate
}