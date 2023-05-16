import React, { useState, useEffect } from 'react';
import './App.css';


function App() {

    const [table1, setTable1] = useState(false);
    const [table2, setTable2] = useState(false);
    const [show, setShow] = useState(false);
    const [clear, setClear] = useState(false);
    const [showClear, setShowClear] = useState(false);
    const [generated, setGenerated] = useState(false);
    const [solution, setSolution] = useState(false);
    const [rows, setRows] = useState(1);
    const [cols, setCols] = useState(1);
    const [newMatriz, setNewMatriz] = useState();
    const [matrix, setMatrix] = useState(
        Array.from({ length: rows }, () => Array.from({ length: cols }, () => 0))
    );

    function handleSubmit(event) {
        event.preventDefault();
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

    function handleRowsChange(event) {
        setShow(true);
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
        setTable1(false);
    }

    function handleColsChange(event) {
        setShow(true);
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
        setTable1(false);
    }


    function gaussJordan(matrix) {
        if (clear) return;
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

        setNewMatriz(matrix);
        setSolution(true);
        setGenerated(false);
        setShowClear(true);
    }


    // Función que se ejecuta cuando el usuario hace clic en "Generar"
    function handleGenerate() {
        let count = 1;
        const matrix_new = [];

        // Genera las matrices y resuelve cada una con el método de Gauss-Jordan
        for (let i = 0; i < count; i++) {
            for (let j = 0; j < rows; j++) {
                let row = [];
                for (let k = 0; k < cols; k++) {
                    row.push(Math.floor(Math.random() * 10)); // Genera un número aleatorio del 0 al 9
                }
                matrix_new.push(row);
            }

        }
        // Actualiza el estado de las matrices y los resultados          
        setMatrix(matrix_new);
        setTable1(true);
        setTable2(true);
        setSolution(false);
        setGenerated(true);

    }

    function clearData() {
        setNewMatriz();
        setMatrix(Array.from({ length: rows }, () => Array.from({ length: cols }, () => 0)));
        setGenerated(false);
        setTable2(false);
        setTable1(true);
        setShow(false);
        setSolution(false);
        setShowClear(false);
        setRows(1);
        setCols(1);
    }


    useEffect(() => {
        if (clear) {
            clearData();
        }
        if (generated) {
            gaussJordan(matrix);
        }
        setClear(false);
    }, [generated, clear]);


    return (
        <div className='div-principal'>
            <div className='div-table'>
                <form onSubmit={handleSubmit}>
                    <section className='section-select'>

                        <label className='label-select' > Seleccione la cantidad de: </label>
                        &nbsp;
                        &nbsp;
                        <label className='label-select-f'>
                            Filas:
                            &nbsp;
                            <input className='select-columns' type="number" min={1} max={20} value={rows} onChange={handleRowsChange} />
                        </label>

                        &nbsp;
                        &nbsp;

                        <label className='label-select-c'>
                            Columnas:
                            &nbsp;
                            <input className='select-columns' type="number" value={cols} min={1} max={13} onChange={handleColsChange} />
                        </label>
                    </section>

                    {!table1 && (<table className='gauss-jordan-table'>
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
                    </table>)}

                    {table2 && (<table className='gauss-jordan-table'>
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
                    </table>)}

                    {show && (
                        <div className='div-principal-btns'>

                            <div className='div-btn'>
                                <button className='btn-resolver' onClick={handleGenerate}>Generar</button>
                            </div>

                            <br />

                            <div className='div-btn'>
                                <button className='btn-resolver' onClick={handleSubmit}>Resolver</button>
                            </div>
                        </div>
                    )}
                </form>

                {solution && (
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
                                                <input id={`input-${i}-${j}`} className='input' type="number" name={`element-${i}-${j}`} defaultValue={cell} min={1} maxLength={2} />
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <br />

                        {showClear && (<div className='div-btn'>
                            <button className='btn-resolver' onClick={() => setClear(true)}>Limpiar</button>
                        </div>)}

                        <br/>
                    </div>
                )}

            </div>
        </div>
    );
}
export { App };
