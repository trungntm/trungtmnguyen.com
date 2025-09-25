import CalendarSkeleton from './CalendarSkeleton'
import LegendSkeleton from './LegendSkeleton'

interface GithubCalendarSkeletonProps {
  legend?: boolean
  verticalLabel?: boolean
  horizontalLabel?: boolean
  blockSize?: number
  blockGap?: number
}

const GithubCalendarSkeleton = ({
  legend = true,
  verticalLabel = true,
  horizontalLabel = true,
  blockSize = 12,
  blockGap = 4,
}: GithubCalendarSkeletonProps) => {
  return (
    <div className="flex items-center space-y-4">
      <div className="overflow-x-auto rounded-lg">
        <div className="min-w-max space-y-2 pb-2">
          {/* Month labels skeleton */}
          {horizontalLabel && (
            <div className="relative">
              <div className="flex">
                {verticalLabel ? (
                  <div
                    className="min-h-4"
                    style={{
                      width: `${blockSize}px`,
                      marginRight: `${6 * blockGap}px`,
                    }}
                  ></div>
                ) : (
                  <div className="min-h-4"></div>
                )}
                <div className="relative flex" style={{ gap: `${blockGap}px` }}>
                  {/* Full width skeleton month label */}
                  <div className="animate-pulse text-xs text-gray-400">
                    <div
                      className="h-4 rounded bg-gray-300 px-2 dark:bg-gray-600"
                      style={{
                        width: `${53 * blockSize + 52 * blockGap}px`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Days of week labels + Calendar skeleton */}
          <div className="flex" style={{ gap: `${blockGap}px` }}>
            {verticalLabel && (
              <div className="mr-1 flex flex-col" style={{ gap: `${blockGap}px` }}>
                <div style={{ height: `${blockSize}px`, width: `${blockSize}px` }} />
                <div
                  className="flex items-center text-xs text-gray-500 dark:text-gray-400"
                  style={{ height: `${blockSize}px` }}
                >
                  Mon
                </div>
                <div style={{ height: `${blockSize}px`, width: `${blockSize}px` }} />
                <div
                  className="flex items-center text-xs text-gray-500 dark:text-gray-400"
                  style={{ height: `${blockSize}px` }}
                >
                  Wed
                </div>
                <div style={{ height: `${blockSize}px`, width: `${blockSize}px` }} />
                <div
                  className="flex items-center text-xs text-gray-500 dark:text-gray-400"
                  style={{ height: `${blockSize}px` }}
                >
                  Fri
                </div>
                <div style={{ height: `${blockSize}px`, width: `${blockSize}px` }} />
              </div>
            )}

            {/* Calendar skeleton */}
            <CalendarSkeleton blockSize={blockSize} blockGap={blockGap} />
          </div>

          {legend && <LegendSkeleton blockSize={blockSize} />}
        </div>
      </div>
    </div>
  )
}

export default GithubCalendarSkeleton
