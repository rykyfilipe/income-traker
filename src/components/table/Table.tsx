import { useRef, useEffect } from "react"
import "./Table.css"
import { useTheme } from "../../context/ThemeContext"

interface TableProps {
    name : string;
    columns: string[];
    data: any[];
    onUpdate?: (rowIndex: number, column: string, value: string) => void;
}

function Table({name, columns, data, onUpdate}:TableProps) {
  const { colors, currency } = useTheme();
  const tableBodyRef = useRef<HTMLTableSectionElement>(null);

  // Scroll to bottom when new row is added
  useEffect(() => {
    if (tableBodyRef.current && data.length > 0) {
      const lastRow = tableBodyRef.current.lastElementChild;
      if (lastRow) {
        lastRow.scrollIntoView({ behavior: 'smooth', block: 'end' });
      }
    }
  }, [data.length]);

  const handleInputChange = (rowIndex: number, column: string, value: string) => {
    if (onUpdate) {
      onUpdate(rowIndex, column, value);
    }
  };

  // Calculate totals for numeric columns
  const calculateTotal = (column: string) => {
    return data.reduce((sum, row) => {
      const value = row[column];
      return sum + (typeof value === 'number' ? value : 0);
    }, 0);
  };

  return (
    <div className="table-container">
        <h2>{name}</h2>
        <div className="table-wrapper">
          <table className="table">
              <thead className="table-header" style={{
                background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`
              }}>
                  <tr>
                      {columns.map((col, index) => (
                          <th key={index}>{col}</th>
                      ))}
                  </tr>
              </thead>
              <tbody className="table-body" ref={tableBodyRef}>
                  {data.map((row, rowIndex) => (
                      <tr key={rowIndex}>
                          {columns.map((col, colIndex) => (
                              <td key={colIndex}>
                                  <div className="table-cell-wrapper">
                                    {(col === 'Amount' || col === 'Budget') && (
                                      <span className="currency-symbol">{currency}</span>
                                    )}
                                    <input 
                                      type="text" 
                                      value={row[col] || ''} 
                                      className={`table-input ${(col === 'Amount' || col === 'Budget') ? 'with-currency' : ''}`}
                                      onChange={(e) => handleInputChange(rowIndex, col, e.target.value)}
                                    />
                                  </div>
                              </td>
                          ))}
                      </tr>
                  ))}
              </tbody>
              <tfoot className="table-footer" style={{
                background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`
              }}>
                  <tr>
                      {columns.map((col, index) => (
                          <td key={index} className="table-total">
                              {index === 0 ? (
                                  <strong>Total</strong>
                              ) : (
                                  <strong>{currency}{calculateTotal(col).toFixed(2)}</strong>
                              )}
                          </td>
                      ))}
                  </tr>
              </tfoot>
          </table>
        </div>
    </div>
  )
}

export default Table