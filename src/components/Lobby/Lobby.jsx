import "./Lobby.scss";

function Lobby({ room, users }) {
  return (
    <article className="lobby">
      <div className="lobby__container">
        <h2 className="lobby__header">ROOM CODE</h2>
        <p className="lobby__copy--contrast">{room}</p>
      </div>

      <div className="lobby">
        <h2 className="lobby__header">PLAYERS</h2>
        <ul className="lobby__list">
          {users.map((user, id) => (
            <li className="lobby__list-item" key={id}>
              {user}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

export default Lobby;
