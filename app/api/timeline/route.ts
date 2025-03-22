import { NextResponse } from 'next/server'

import workingTimeline from '@/data/workingTimeline'

const handler = () => {
  return NextResponse.json(workingTimeline)
}

export { handler as GET }
