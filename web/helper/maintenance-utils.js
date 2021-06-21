import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'

dayjs.extend(isBetween)

export const isCurrentBetweenStartAndEnd = (startTime, endTime) => {
  const currentTime = dayjs()
  return currentTime.isBetween(dayjs(startTime), dayjs(endTime))
}
