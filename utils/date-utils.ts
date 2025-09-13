import dayjs from 'dayjs'

export const formatDate = (date: Date | undefined) => {
  if (!date) {
    date = new Date()
  }
  return dayjs(date).format('MMMM D, YYYY h:mm A')
}
