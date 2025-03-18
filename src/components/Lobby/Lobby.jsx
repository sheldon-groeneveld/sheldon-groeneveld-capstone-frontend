function Lobby({ room, users }) {
  return (
    <section>
      <h2>Room Code</h2>
      <div>
        <p>{room}</p>
      </div>

      <div>
        <h2>Players</h2>
        <ul>
          {users.map((user, id) => (
            <li key={id}>{user}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default Lobby;
