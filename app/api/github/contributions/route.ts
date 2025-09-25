// app/api/github/contributions/route.ts (Next.js App Router)
import { NextRequest, NextResponse } from 'next/server'

const endpoint = 'https://api.github.com/graphql'
const GITHUB_TOKEN = process.env.GITHUB_TOKEN

const query = `
  query($login: String!, $from: DateTime!, $to: DateTime!) {
    user(login: $login) {
      contributionsCollection(from: $from, to: $to) {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
              color
            }
          }
        }
      }
    }
  }
`

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const user = searchParams.get('user')

    // Calculate date range server-side (last 12 months)
    const today = new Date()
    const fromDate = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate())
    const from = fromDate.toISOString()
    const to = today.toISOString()

    if (!user) {
      return NextResponse.json({ error: 'Missing user parameter' }, { status: 400 })
    }

    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables: { login: user, from, to },
      }),
      next: {
        revalidate: 86400, // Cache for 1 day (24 hours * 60 minutes * 60 seconds)
        tags: [`github-contributions-${user}`], // Allow targeted cache invalidation
      },
    })

    const data = await res.json()
    if (data.errors) {
      return NextResponse.json({ error: data.errors }, { status: 500 })
    }

    const contributionCalendar = data.data.user.contributionsCollection.contributionCalendar

    // Calculate month labels
    const monthLabels: { month: string; weekIndex: number }[] = []
    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ]
    let lastMonth = -1

    const currentMonth = today.getMonth()
    const currentYear = today.getFullYear()

    contributionCalendar.weeks.forEach(
      (week: { contributionDays: { date: string }[] }, index: number) => {
        if (week.contributionDays.length > 0) {
          const firstDay = new Date(week.contributionDays[0].date)
          const month = firstDay.getMonth()
          const year = firstDay.getFullYear()

          // Do not show the month label for the last year if it's equals with current month
          // For example:
          // current month is 9/2025 -> the month labels should be: ["", Oct, Nov, Dec, Jan, Feb, Mar, Apr, May, Jun, Jul, Aug, Sep]
          const monthLabel = month === currentMonth && year === currentYear - 1 ? '' : months[month]

          if (month !== lastMonth) {
            monthLabels.push({
              month: monthLabel,
              weekIndex: index,
            })
            lastMonth = month
          }
        }
      }
    )

    // Add labels to the response
    const enrichedData = {
      ...contributionCalendar,
      monthLabels,
    }

    const response = NextResponse.json(enrichedData)

    // Add cache headers for client-side and CDN caching
    response.headers.set('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate=43200')

    return response
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred'
    return NextResponse.json({ error: errorMessage }, { status: 500 })
  }
}
