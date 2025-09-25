export type ContributionDay = {
  date: string
  contributionCount: number
  color: string
}

export type Week = {
  contributionDays: ContributionDay[]
}

export type ContributionData = {
  totalContributions: number
  weeks: Week[]
  monthLabels: { month: string; weekIndex: number }[]
}
