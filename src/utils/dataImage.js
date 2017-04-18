import randColor from './randColor'
/* 参考 https://github.com/nuysoft/Mock */

const pick = (arr) => {
    if (!(arr instanceof Array) || arr.length < 1) {
        return
    }
    return Math.ceil(Math.random() * (arr.length - 1))
}

const randomSizes = ['300x250', '250x250', '240x400', '336x280', '600x300', '300x600', '280x336', '400x240', '250x300']

const dataImage = (size, text = '') => {
    let canvas
    if (typeof document !== 'undefined') {
        canvas = document.createElement('canvas')
    } else {
        let Canvas = module.require('canvas')
        canvas = new Canvas()
    }

    let ctx = canvas && canvas.getContext && canvas.getContext("2d")
    if (!canvas || !ctx) return ''

    if (!size) size = pick(randomSizes)

    size = size.split('x')

    let width = parseInt(size[0], 10),
        height = parseInt(size[1], 10),
        background = randColor(),
        foreground = '#FFF',
        text_height = 14,
        font = 'sans-serif';

    canvas.width = width
    canvas.height = height
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillStyle = background
    ctx.fillRect(0, 0, width, height)
    ctx.fillStyle = foreground
    ctx.font = 'bold ' + text_height + 'px ' + font
    ctx.fillText(text, (width / 2), (height / 2), width)
    return canvas.toDataURL('image/png')
}

export default dataImage
