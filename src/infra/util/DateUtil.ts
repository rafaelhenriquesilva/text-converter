import { format } from 'date-fns'
export const formatStringDateYYYYMMDD = (dateStr: string) => {
  return `${dateStr.slice(0, 4)}-${dateStr.slice(4, 6)}-${dateStr.slice(6)}`
}

export const formatDateYYYYMMDD = (date: Date) => {
  return format(date, 'yyyy-MM-dd')
}