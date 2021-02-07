import Moment from 'moment';

//Destructure out object for readibility of code
const TalentItem = ({
  profile: {
    name: { first, last },
    picture: { medium: profilePic },
    location: { city },
    dob: { date: birthday, realAge: age },
  },
}) => {
  return (
    <div className="talent-card">
      <h3>
        {first} {last}
      </h3>
      <img src={profilePic} alt={`${first} ${last}`} />
      <p>{Moment(birthday).format('do MMMM Y')}</p>
      <p>{age}</p>
      <p>From {city}</p>
    </div>
  );
};

export default TalentItem;
