import React from "react";
import "./SearchLeads.css";

export default function LeadsTable({ data, columns }) {
  return (
    <div className="table-box">
      <div className="table-container">
        <table>
          <thead>
            <tr>
              {columns.map((column, index) => (
                <th key={index}>
                  {typeof column === "object" ? column.Header : column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr
                key={index}
                style={{
                  backgroundColor: index % 2 === 0 ? "#FFFFFF" : "#ECB9401A",
                }}
              >
                {columns.map((column, colIndex) => (
                  <td key={colIndex}>
                    {typeof column === "object"
                      ? row[column.accessor]
                      : row[column]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
