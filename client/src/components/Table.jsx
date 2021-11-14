import React from 'react'
import './Table.css'
import TableItem from './TableItem'
export default function Table({ users }) {
  return (
    <table id="customers">
      <thead>
        <tr>
          <th>ID (click for user page)</th>
          <th>Name</th>
          <th>Cash</th>
          <th>Credit</th>
          <th>Active status</th>
        </tr>
      </thead>
      {
        users.length === 0 ? null : (
          <tbody>
            {users.map(user => {
              return <TableItem key={user.passportID} user={user}></TableItem>
            })}
          </tbody>
        )
      }
    </table>
  )
}
