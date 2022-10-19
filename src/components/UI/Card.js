import "./css/Card.css";

function Card(props) {
  //   const { user } = props;
  return (
    <div className="Card">
      <div className="Card-img">
        <img
          src="https://scontent.fsgn2-1.fna.fbcdn.net/v/t39.30808-6/280109609_3121034704880165_6664039898340461523_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=t2OGY5flD6QAX9_SXuh&_nc_ht=scontent.fsgn2-1.fna&oh=00_AT8WqS47yRZfyGIgTD4C7Bl18i09J9CdSszIvrXIDxsAiw&oe=63539FAE"
          alt=""
        />
      </div>
      <div className="Card-info">
        <h3 className="Card-info-title">Fresher Java Developer</h3>
        <p className="Card-info-name">Huynh Thanh Nha</p>
        <p className="Card-info-address">Thành phố Hồ Chí Minh</p>

        <ul className="Card-info-reasons-work">
          <li className="Card-info-reason">Highly Skills and Technicals</li>
          <li className="Card-info-reason">
            Approach, research, and learn new Technology fast
          </li>
          <li className="Card-info-reason">
            Teamworks, Has highly responsible spirit
          </li>
        </ul>

        <ul className="Card-info-skills">
          <li className="Card-info-skill card-small">Java</li>
          <li className="Card-info-skill card-small">Spring</li>
          <li className="Card-info-skill card-small">Javascript</li>
          <li className="Card-info-skill card-small">React JS</li>
          <li className="Card-info-skill card-small">SQL</li>
          <li className="Card-info-skill card-small">Docker</li>
          <li className="Card-info-skill card-small">Linux</li>
          <li className="Card-info-skill card-small">English</li>
        </ul>
      </div>
    </div>
  );
}

export default Card;
