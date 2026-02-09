//پیام خظا رو برمیگرداند
const ErrorHandling = ({ message }) => {
  if (!message) return null;

  return (
    <div className="alert alert-danger alert-dismissible fade show mb-3">
      {message}
    </div>
  );
};

export default ErrorHandling;
