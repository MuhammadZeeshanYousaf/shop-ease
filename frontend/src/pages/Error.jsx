function Error({ code, message = "An unexpected Error" }) {
  return (
    <div>
      Error
      <br />
      <h2>{code}</h2>
      <h3>{message}</h3>
    </div>
  );
}

export default Error;
