const max = 100
const min = 1

function matrix(row, col=null){
    col = col == null   ? row : col
    row = row >= min    ? row : null
    col = col >= min    ? col : null
    row = row <= max    ? row : null
    col = col <= max    ? col : null

    if(row == null || col == null){
        console.log("Incorrect input")
        return
    }
    let matrix = Array.from({length: row}, () => Array.from({length: col}, () => Math.floor(Math.random() * 198 - 99)))
    return matrix
}

function determinant(matrix, sq=false){
    console.log(matrix)
    if(!Array.isArray(matrix) || !Array.isArray(matrix[0]) || Array.isArray(matrix[0][0])){
        console.log("Incorrect input")
        throw new Error("The passed data isn't a matrix")
    }
    let row = matrix.length
    let col = matrix[0].length
    sq = sq ? sq : row==col
    if(sq){
        let det = 1
        for(let i = 0; i < row; i++){
            let pivot = matrix[i][i]
            if(pivot == 0){
                let found = false
                for(let j = i+1; j < row; j++){
                    if(matrix[j][i] != 0){
                        found = true
                        let temp = matrix[i]
                        matrix[i] = matrix[j]
                        matrix[j] = temp
                        pivot = matrix[i][i]
                        det *= -1
                        break
                    }
                }
                if(!found){
                    return 0
                }
            }
            for(let j = i+1; j < row; j++){
                let factor = matrix[j][i] / pivot
                for(let k = i+1; k < col; k++){
                    matrix[j][k] -= factor * matrix[i][k]
                }
            }
            det *= pivot
        }
        console.log(matrix)

        return det
        /*
        let result = 0

        for(let i = 0; i<col; i++){
            let sign = (i % 2 == 0) ? 1 : -1
            let temp = new Array
            for(let j = 1; j < row; j++){
                let t = new Array
                    for(let k = 0; k < col; k++){
                        if(k == i){
                            continue
                        }
                        t.push(matrix[j][k])
                }
                temp.push(t)
            }
            result += sign * matrix[0][i] * determinant(temp)
        }
        return result*/
    }else{
        console.log("The matrix isnt square")
        return false
    }
}

function drawMatrix(matrix){
    if(!Array.isArray(matrix) || !Array.isArray(matrix[0]) || Array.isArray(matrix[0][0])){
        console.log("Incorrect input")
        throw new Error("The passed data isn't a matrix")
    }

    let string = ''
    let temp = '|'
    matrix.forEach(e => {
        temp = '|'
        e.forEach(el => {
            spaces = el.toString().length
            spaces = 4-spaces
            temp = temp.concat(' '.repeat(spaces), el)
        })
        temp += '  |'
        string += temp + '\n'
    })
    console.log(string)

}