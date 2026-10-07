import React from 'react'
import { EmptyState } from './EmptyState'

// Generic table renderer: columns = [{ key, header, render? }]
export function DataTable({ columns, rows, emptyMessage }) {
  if (!rows || rows.length === 0) {
    return (
      <div className="table-wrap">
        <EmptyState message={emptyMessage} />
      </div>
    )
  }
  return (
    <div className="table-wrap">
      <table className="app-table">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key}>{col.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => (
            <tr key={row.id ?? idx}>
              {columns.map((col) => (
                <td key={col.key}>{col.render ? col.render(row) : row[col.key] ?? '—'}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
