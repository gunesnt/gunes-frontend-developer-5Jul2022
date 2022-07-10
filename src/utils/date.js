import * as dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'

const PARSE_FORMAT = 'MM-YYYY'
const DISPLAY_FORMAT = 'MMM YYYY'

export function formatDate(dateStr, displayFormat = DISPLAY_FORMAT) {
  dayjs.extend(customParseFormat)
  const date = dayjs(dateStr, PARSE_FORMAT)
  return date.isValid() && date.format(displayFormat)
}
