const max = 100
const min = 1

function matrix(row, col=null, a=198, b=99){
    col = col == null   ? row : col
    row = row >= min    ? row : null
    col = col >= min    ? col : null
    row = row <= max    ? row : null
    col = col <= max    ? col : null

    if(row == null || col == null){
        console.log("Incorrect input")
        return
    }
    let matrix = Array.from({length: row}, () => Array.from({length: col}, () => Math.floor(Math.random() * a - b)))
    return matrix
}

function determinant(matrix, sq=false, prec=false){
    console.log(matrix)
    isMatrix(matrix)
    let row = matrix.length
    let col = matrix[0].length
    sq = sq ? sq : row==col
    if(sq){
        if(!prec){
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
        }else{
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
                result += sign * matrix[0][i] * determinant(temp, true, truez)
            }
            return result    
        }
    }else{
        console.log("The matrix isnt square")
        return false
    }
}

function multiplication(matrixA, matrixB){
    let mA
    let mB
    if(!Number.isInteger(matrixA)){
        mA = isMatrix(matrixA)
    }
    if(!Number.isInteger(matrixB)){
        mB = isMatrix(matrixB)
    }
    let rowA = matrixA.length()
    let colA = matrixA[0].length()
    let rowB = matrixB.length()
    let colB = matrixB[0].length()
    
    let matrix = matrix(colA)
}











function drawMatrix(matrix){
    if(isMatrix(matrix)){
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

function isMatrix(matrix){
    if(!Array.isArray(matrix) || !Array.isArray(matrix[0]) || Array.isArray(matrix[0][0])){
        throw new Error("The passed data isn't a matrix")
    }
    return true
}