const max = 100
const min = 1

function matrix(row, col){
    if(row == null || col == null){
        return
    }
    row = row < min ? min : row
    col = col < min ? min : col
    row = row > max ? max : row
    col = col > max ? max : col
    let matrix = Array.from({length: row}, () => Array.from({length: col}, () => Math.floor(Math.random() * 198 - 99)))
    return matrix
}