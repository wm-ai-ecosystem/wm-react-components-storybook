export const AppSpinner = ({ show, message }: { show: boolean; message: string }) => {
  if (!show) {
    return null;
  }
  return (
    <div className="app-spinner global-spinner">
      <div className="spinner-message">
        <i className="spinner-image animated infinite fa fa-circle-o-notch fa-spin"></i>
        <div className="spinner-messages">
          <p>{message}</p>
        </div>
      </div>
    </div>
  );
};

export default AppSpinner;
