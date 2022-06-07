export default function prettyDate(value) {
    const valueWithOutTresh = value.split('.')[0]
    const [date, time] = valueWithOutTresh.split('T')

    return `${date} ${time}`
}
