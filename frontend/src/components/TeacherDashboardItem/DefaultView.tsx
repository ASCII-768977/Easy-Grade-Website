import checkIcon from '../../assets/img/check_mark.svg';
import './DefaultView.scss';

const DefaultView: React.FC<any> = (props: any) => {
  return (
    <div className="dashboard-small-card-layout">
      <h2 className="title-font-settings"> {props.title} </h2>
      <div className="center-position">
        <div className="check-icon-settings">
          <img src={checkIcon} alt="dashboard small items by default" />
        </div>
        <div>
          <p className="content-settings"> {props.message} </p>
        </div>
      </div>
    </div>
  );
};

export default DefaultView;
