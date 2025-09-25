export interface CalendarThemeColors {
  empty: string
  level1: string
  level2: string
  level3: string
  level4: string
  border: string
}

export interface CalendarTheme {
  light: CalendarThemeColors
  dark: CalendarThemeColors
}

export const calendarThemes: CalendarTheme = {
  light: {
    empty: '#ebedf0',
    level1: '#9be9a8',
    level2: '#40c463',
    level3: '#30a14e',
    level4: '#216e39',
    border: '#e1e4e8',
  },
  dark: {
    empty: '#161b22',
    level1: '#0e4429',
    level2: '#006d32',
    level3: '#26a641',
    level4: '#39d353',
    border: '#30363d',
  },
}

export function getContributionColor(
  contributionCount: number,
  themeColors: CalendarThemeColors
): string {
  if (contributionCount === 0) return themeColors.empty
  if (contributionCount >= 1 && contributionCount <= 3) return themeColors.level1
  if (contributionCount >= 4 && contributionCount <= 6) return themeColors.level2
  if (contributionCount >= 7 && contributionCount <= 9) return themeColors.level3
  return themeColors.level4
}
