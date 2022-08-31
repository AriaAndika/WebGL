function lerp(a, b, t) {
    return a + (b - a) * t
}
function Ilerp(a, b, x) {
    return (x - a) / (b - a)
}

// Array
function max(array) {
    var score = 0
    array.forEach(e => {
        if (score < e) score = e
    })
    return score
}