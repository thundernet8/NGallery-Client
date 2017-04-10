const colors = [
    '#e2dbd9',
    '#d2dad8',
    '#f2efec',
    '#eef8fc',
    '#706c6a',
    '#f9fafb',
    '#fefaf1',
    '#8e8580',
    '#fdd393',
    '#b1bdc9',
    '#6e7161',
    '#e4bab6',
    '#f9f8ea',
    '#e6ebe5'
]

export default function () {
    let rand = Math.ceil(Math.random() * (colors.length - 1))
    return colors[rand]
}
