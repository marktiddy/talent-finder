import Moment from 'moment';

const TalentItem = ({ profile }) => {
  return (
    <div className="talent-card">
      <h3>
        {profile.name.first} {profile.name.last}
      </h3>
      <img src={profile.picture.medium} />
      <p>{Moment(profile.dob.date).format('do MMMM Y')}</p>
      <p>From {profile.location.city}</p>
    </div>
  );
};

export default TalentItem;
