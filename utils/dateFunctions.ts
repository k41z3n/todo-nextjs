import { formatDistanceToNow } from 'date-fns'

export const timeFromToNow = (date: number) => {

    return formatDistanceToNow(date)

}