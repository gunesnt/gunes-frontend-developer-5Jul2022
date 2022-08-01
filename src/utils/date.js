import * as dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'

const DISPLAY_FORMAT = 'MMM YYYY'

export function formatDate(date, displayFormat = DISPLAY_FORMAT) {
  dayjs.extend(customParseFormat)
  const dayjsDate = dayjs(date)
  return dayjsDate.isValid() && dayjsDate.format(displayFormat)
}
