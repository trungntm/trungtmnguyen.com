/**
 * Date Helper Utilities
 * Includes lunar calendar conversion for Vietnamese holidays
 */

import { DateRange, LunarDate } from './holidayTypes'

const LUNAR_DATA: Record<number, number[]> = {
  2024: [30, 29, 30, 29, 30, 29, 30, 30, 29, 30, 29, 30, 0],
  2025: [30, 29, 30, 29, 30, 30, 29, 30, 29, 30, 29, 30, 0],
  2026: [29, 30, 29, 30, 29, 30, 30, 29, 30, 29, 30, 29, 0],
  2027: [30, 29, 30, 29, 30, 29, 30, 29, 30, 30, 29, 30, 6],
  2028: [29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 30, 29, 0],
  2029: [30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 30, 0],
  2030: [29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 0],
}

const LUNAR_NEW_YEAR_DATES: Record<number, Date> = {
  2024: new Date(2024, 1, 10),
  2025: new Date(2025, 0, 29),
  2026: new Date(2026, 1, 17),
  2027: new Date(2027, 1, 6),
  2028: new Date(2028, 0, 26),
  2029: new Date(2029, 1, 13),
  2030: new Date(2030, 1, 3),
}

export function lunarToGregorian(lunarDate: LunarDate, year: number): Date[] {
  const dates: Date[] = []
  const lunarNewYear = LUNAR_NEW_YEAR_DATES[year]
  if (!lunarNewYear) return dates

  const lunarData = LUNAR_DATA[year]
  if (!lunarData) return dates

  let daysFromNewYear = 0
  for (let month = 1; month < lunarDate.month; month++) {
    daysFromNewYear += lunarData[month - 1]
  }

  for (const day of lunarDate.days) {
    const totalDaysOffset = daysFromNewYear + (day - 1)
    const gregorianDate = new Date(lunarNewYear)
    gregorianDate.setDate(lunarNewYear.getDate() + totalDaysOffset)
    dates.push(gregorianDate)
  }

  return dates
}

export function isDateInRange(
  date: Date,
  startDate: DateRange,
  endDate: DateRange,
  year?: number
): boolean {
  const checkYear = year ?? date.getFullYear()
  const currentMonth = date.getMonth() + 1
  const currentDay = date.getDate()

  if (startDate.month > endDate.month) {
    return (
      (currentMonth === startDate.month && currentDay >= startDate.day) ||
      (currentMonth === endDate.month && currentDay <= endDate.day) ||
      currentMonth > startDate.month ||
      currentMonth < endDate.month
    )
  }

  if (startDate.month === endDate.month) {
    return (
      currentMonth === startDate.month && currentDay >= startDate.day && currentDay <= endDate.day
    )
  }

  return (
    (currentMonth === startDate.month && currentDay >= startDate.day) ||
    (currentMonth === endDate.month && currentDay <= endDate.day) ||
    (currentMonth > startDate.month && currentMonth < endDate.month)
  )
}

export function isLunarDateMatch(date: Date, lunarDate: LunarDate): boolean {
  const year = date.getFullYear()
  const gregorianDates = lunarToGregorian(lunarDate, year)
  return gregorianDates.some((gregorianDate) => isSameDay(date, gregorianDate))
}

export function isSameDay(date1: Date, date2: Date): boolean {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  )
}

export function getToday(): Date {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return today
}

export function formatHolidayDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

export function getHolidayDateRangeString(
  startDate?: DateRange,
  endDate?: DateRange,
  lunarDate?: LunarDate
): string {
  if (lunarDate) {
    const daysList = lunarDate.days.join(', ')
    return `Lunar ${lunarDate.month}/${daysList}`
  }

  if (startDate && endDate) {
    return `${startDate.month}/${startDate.day} - ${endDate.month}/${endDate.day}`
  }

  return 'Date not specified'
}
