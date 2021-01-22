import TalentItem from './TalentItem';

const Talent = ({ talent, error }) => {
  return (
    <div className="talent-container">
      <h2>Latest Talent</h2>
      <div className="talent-listings">
        {error && <p className="error">{error}</p>}
        {talent.map((t, idx) => (
          <TalentItem key={idx} profile={t} />
        ))}
      </div>
    </div>
  );
};

export default Talent;
