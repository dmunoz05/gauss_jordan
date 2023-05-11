import React, { useState } from 'react';
// import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';
import './App.css';

function App() {
    const [matrix, setMatrix] = useState([[1, 2, 3], [4, 5, 6], [7, 8, 9]]); // Ejemplo de matriz inicial
    const [size, setSize] = useState(3); // Tamaño de la matriz
    const [count, setCount] = useState(1); // Cantidad de matrices
    const [matrices, setMatrices] = useState([]); // Matrices a resolver
    const [results, setResults] = useState([]); // Resultados de las matrices resueltas

    const handleSolve = () => {

        // Aquí puedes implementar la lógica del método de Gauss-Jordan para resolver la matriz.
        // Puedes utilizar la lógica que te proporcioné anteriormente en una función separada.
        // Actualiza la matriz actualizada en el estado utilizando setMatrix.
    }

    function gaussJordan(matrix) {
        let n = matrix.length;
        let m = matrix[0].length;

        for (let i = 0; i < n; i++) {
            // Encuentra la fila con el valor absoluto más grande en la columna i
            let maxRow = i;
            for (let j = i + 1; j < n; j++) {
                if (Math.abs(matrix[j][i]) > Math.abs(matrix[maxRow][i])) {
                    maxRow = j;
                }
            }

            // Intercambia la fila con el valor absoluto más grande con la fila actual (i)
            let tmp = matrix[i];
            matrix[i] = matrix[maxRow];
            matrix[maxRow] = tmp;

            // Divide la fila actual (i) por el valor en la columna i
            let divisor = matrix[i][i];
            for (let j = i; j < m; j++) {
                matrix[i][j] /= divisor;
            }

            // Resta la fila actual (i) multiplicada por el valor en la columna i de cada otra fila
            for (let j = 0; j < n; j++) {
                if (j !== i) {
                    let factor = matrix[j][i];
                    for (let k = i; k < m; k++) {
                        matrix[j][k] -= factor * matrix[i][k];
                    }
                }
            }
        }

        return matrix;
    }

    // Función que se ejecuta cuando el usuario hace clic en "Generar"
    function handleGenerate() {
        let newMatrices = [];
        let newResults = [];

        // Genera las matrices y resuelve cada una con el método de Gauss-Jordan
        for (let i = 0; i < count; i++) {
            let matrix = [];
            for (let j = 0; j < size; j++) {
                let row = [];
                for (let k = 0; k < size + 1; k++) {
                    row.push(Math.floor(Math.random() * 10)); // Genera un número aleatorio del 0 al 9
                }
                matrix.push(row);
            }
            newMatrices.push(matrix);
            newResults.push(gaussJordan(matrix));
        }

        // Actualiza el estado de las matrices y los resultados
        setMatrices(newMatrices);
        setResults(newResults);
    }



    return (
        <div className='div-principal'>
            <div className='div-table'>
                <section className='section-select'>
                    <label className='label-select' > Seleccione la cantidad de Columnas </label>
                    &nbsp;
                    &nbsp;
                    <select className='select-columns'>
                        <option> </option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5   </option>
                    </select>
                </section>

                <table className='gauss-jordan-table'>
                    <tr>
                        {matrix[0].map((_, index) => (
                            <td key={index}>Columna {index + 1}</td>
                        ))}
                    </tr>
                    <tr>
                        {matrix.map((row, rowIndex) => (
                            <td key={rowIndex}>
                                {row.map((value, columnIndex) => (
                                    <div key={columnIndex}>{value}</div>
                                ))}
                            </td>
                        ))}
                    </tr>
                </table>
                <br />
                <div className='div-btn'>
                    <button className='btn-resolver' onClick={handleSolve}>Resolver</button>
                </div>
                
                <br/>
                <br/>
                <hr/>
                <br/>
                <br/>

                <section className='section-select'>
                    <label className='label-select'> Solución </label>                    
                </section>
                <table className='gauss-jordan-table'>
                    <tr>
                        {matrix[0].map((_, index) => (
                            <td key={index}>Columna {index + 1}</td>
                        ))}
                    </tr>
                    <tr>
                        {matrix.map((row, rowIndex) => (
                            <td key={rowIndex}>
                                {row.map((value, columnIndex) => (
                                    <div key={columnIndex}>{value}</div>
                                ))}
                            </td>
                        ))}
                    </tr>
                </table>


            </div>

        </div>


    );
}
export { App };
