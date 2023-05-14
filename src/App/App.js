import React, { useState, useEffect } from 'react';
// import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';
import './App.css';


function App() {

    const [table, setTable] = useState(false);
    const [rows, setRows] = useState(2);
    const [cols, setCols] = useState(2);
    const [matrix, setMatrix] = useState(
        Array.from({ length: rows }, () => Array.from({ length: cols }, () => 0))
    );

    const [newMatriz, setNewMatriz] = useState(

    );

    // function updatedColumns(event) {
    //     event.preventDefault();
    //     const newMatrix = [];
    //     for (let i = 0; i < rows; i++) {
    //         const row = [];
    //         for (let j = 0; j < cols; j++) {
    //             const value = parseFloat(event.target[`element-${i}-${j}`].value);
    //             row.push(value);
    //         }
    //         newMatrix.push(row);
    //     }
    //     setMatrix(newMatrix);
    // }

    function handleSubmit(event) {
        event.preventDefault();
        const form = event.target;
        const newMatrix = [];
        for (let i = 0; i < matrix.length; i++) {
            const row = [];
            for (let j = 0; j < matrix[i].length; j++) {
                const inputValue = parseFloat(document.getElementById(`input-${i}-${j}`).value);
                row.push(inputValue);
            }
            newMatrix.push(row);
        }
        gaussJordan(newMatrix);
    }


    // function handleSubmit(event) {
    //     debugger;
    //     event.preventDefault();
    //     const form = event.target;
    //     const newMatrix = [];
    //     for (let i = 0; i < matrix.length; i++) {
    //         const row = [];
    //         for (let j = 0; j < matrix[i].length; j++) {
    //             const inputName = `element-${i}-${j}`;
    //             const inputValue = parseFloat(`document.getElementById('input-${i}-${j}').value`);
    //             // const inputValue = parseFloat(form.elements[inputName].value);
    //             row.push(inputValue);
    //         }
    //         newMatrix.push(row);
    //     }
    //     gaussJordan(newMatrix);
    // }

    function handleRowsChange(event) {
        setRows(parseInt(event.target.value));
        const numRows = parseInt(event.target.value);
        const newMatrix = [];
        for (let i = 0; i < numRows; i++) {
            const row = [];
            for (let j = 0; j < matrix[0].length; j++) {
                row.push(0);
            }
            newMatrix.push(row);
        }
        setMatrix(newMatrix);
    }

    function handleColsChange(event) {
        setCols(parseInt(event.target.value));
        const numCols = parseInt(event.target.value);
        const newMatrix = [];
        for (let i = 0; i < matrix.length; i++) {
            const row = [];
            for (let j = 0; j < numCols; j++) {
                row.push(0);
            }
            newMatrix.push(row);
        }
        setMatrix(newMatrix);
    }


    function gaussJordan(matrix) {
        debugger;
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
        console.log(matrix);
        setNewMatriz(matrix)
        setTable(true);
        // return matrix;
    }

    // // Función que se ejecuta cuando el usuario hace clic en "Generar"
    // function handleGenerate() {
    //     debugger;
    //     let newMatrices = [];
    //     let newResults = [];

    //     // Genera las matrices y resuelve cada una con el método de Gauss-Jordan
    //     for (let i = 0; i < count; i++) {
    //         let matrix = [];
    //         for (let j = 0; j < size; j++) {
    //             let row = [];
    //             for (let k = 0; k < size * 1; k++) {
    //                 row.push(Math.floor(Math.random() * 10)); // Genera un número aleatorio del 0 al 9
    //             }
    //             matrix.push(row);
    //         }
    //         newMatrices.push(matrix);
    //         newResults.push(gaussJordan(matrix));
    //     }

    //     // Actualiza el estado de las matrices y los resultados
    //     setMatrices(newMatrices);
    //     setResults(newResults);
    // }

    // useEffect(() => {

    // }, []);

    // function random(min, max) {
    //     var aleatorio = Math.floor((Math.random() * (max - min + 1)) + min);
    // }

    // const [rows, setRows] = useState();
    // function handleRowsChange(event) {
    //     setRows(parseInt(event.target.value));
    // }

    // const [cols, setCols] = useState();
    // function handleColsChange(event) {
    //     setCols(parseInt(event.target.value));
    // }

    return (
        <div className='div-principal'>
            <div className='div-table'>
                <form onSubmit={handleSubmit}>
                    <section className='section-select'>

                        <label className='label-select' > Seleccione la cantidad de: </label>
                        &nbsp;
                        &nbsp;
                        &nbsp;
                        <label>
                            Filas:
                            &nbsp;
                            <input className='select-columns' type="number" value={rows} onChange={handleRowsChange} />
                        </label>

                        &nbsp;
                        &nbsp;

                        <label>
                            Columnas:
                            &nbsp;
                            <input className='select-columns' type="number" value={cols} onChange={handleColsChange} />
                        </label>

                        &nbsp;
                        &nbsp;
                        &nbsp;
                        &nbsp;
                        {/* <button className='btn-aceptar' type='submit' onClick={handleAccept}> Aceptar </button> */}
                    </section>

                    <table className='gauss-jordan-table'>
                        <tbody className='tbody'>
                            {matrix.map((row, i) => (
                                <tr className='tr-input' key={i}>
                                    {row.map((cell, j) => (
                                        <td className='td-input' key={`${i}-${j}`}>
                                            <input id={`input-${i}-${j}`} className='input' type="number" name={`element-${i}-${j}`} defaultValue={cell} />
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <br />
                    <div className='div-btn'>
                        <button className='btn-resolver' onClick={handleSubmit}>Resolver</button>
                    </div>

                </form>

                <div className='div-btn'>
                    {/* <button className='btn-resolver' onClick={handleGenerate}>Generar Matriz</button> */}
                </div>

                {table && (
                    <div>
                        <br />
                        <br />
                        <hr />
                        <br />
                        <br />
                        <section className='section-select'>
                            <label className='label-select'> Solución </label>
                        </section>


                        <table className='gauss-jordan-table'>
                            <tbody className='tbody'>
                                {newMatriz.map((row, i) => (
                                    <tr className='tr-input' key={i}>
                                        {row.map((cell, j) => (
                                            <td className='td-input' key={`${i}-${j}`}>
                                                <input id={`input-${i}-${j}`} className='input' type="number" name={`element-${i}-${j}`} defaultValue={cell} />
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

            </div>
        </div>
    );
}
export { App };
