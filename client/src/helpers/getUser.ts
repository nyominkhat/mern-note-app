const getUser = () => {
  const name = localStorage.getItem("username");

  return name;
};

export default getUser;
