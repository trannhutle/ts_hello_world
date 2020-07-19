import * as React from "react";
import "./Confirm.css";

interface IProps {
  open: boolean;
  title: string;
  content: string;
  cancelCaption?: string;
  okCaption?: string;
  onOkClick: () => void;
  onCancelClick: () => void;
}

const Confirm: React.SFC<IProps> = (props) => {
  
  const handleOkClick = () => {
    console.log("Ok clicke", props);
    props.onOkClick();
  };
  const handleCancelClick = () => {
    console.log("Cancle click", props);
    props.onCancelClick();
  };
  return (
    <div
      className={
        props.open ? "confirm-wrapper confirm-visible" : "comfirm-wrapper"
      }
    >
      <div className="confirm-container">
        <div className="confirm-title-container">
          <span>{props.title}</span>
        </div>
        <div className="confirm-content-container">
          <p>{props.content}</p>
        </div>
        <div className="confirm-buttons-container">
          <button className="confirm-cancel" onClick={handleCancelClick}>
            {props.cancelCaption}
          </button>
          <button className="confirm-ok" onClick={handleOkClick}>
            {props.okCaption}
          </button>
        </div>
      </div>
    </div>
  );
};
Confirm.defaultProps = {
  cancelCaption: "Cancel",
  okCaption: "Okay",
};
export default Confirm;
