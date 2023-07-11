const authorized = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    return false;
  }

  return true;
};

export default authorized;
