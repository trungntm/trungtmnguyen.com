import { NextResponse } from 'next/server'

import workingTimeline from '@/data/workingTimeline'

const handler = (): NextResponse => {
  return NextResponse.json(workingTimeline as unknown)
}

export { handler as GET }
