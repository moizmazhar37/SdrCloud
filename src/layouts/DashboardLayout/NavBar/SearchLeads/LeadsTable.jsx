import React from "react";
import "./SearchLeads.css";

export default function LeadsTable({
  data,
  columns,
  selectedRows,
  setSelectedRows,
}) {
  const toggleAllRows = (isChecked) => {
    setSelectedRows(isChecked ? data : []);
  };

  const handleCheckboxChange = (row) => {
    setSelectedRows((prev) =>
      prev.includes(row) ? prev.filter((item) => item !== row) : [...prev, row]
    );
  };

  return (
    <div className="table-box">
      <table>
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                onChange={(e) => toggleAllRows(e.target.checked)}
                checked={selectedRows.length === data.length && data.length > 0}
              />
            </th>
            {columns.map((column, index) => (
              <th key={index}>{column}</th>
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
              <td>
                <input
                  type="checkbox"
                  onChange={() => handleCheckboxChange(row)}
                  checked={selectedRows.includes(row)}
                />
              </td>
              {columns.map((column, colIndex) => (
                <td key={colIndex}>{row[column]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
