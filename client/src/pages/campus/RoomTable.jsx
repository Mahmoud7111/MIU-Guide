import React from 'react';

const RoomTable = ({ rooms }) => (
  <table>
    <thead>
      <tr><th>Room</th><th>Capacity</th></tr>
    </thead>
    <tbody>
      {rooms && rooms.length ? rooms.map((r, i) => (
        <tr key={i}><td>{r.name}</td><td>{r.capacity}</td></tr>
      )) : <tr><td colSpan="2">No rooms</td></tr>}
    </tbody>
  </table>
);

export default RoomTable;
