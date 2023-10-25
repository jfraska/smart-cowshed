const allRoles = {
  user: ["getUser"],
  admin: ["getUsers", "manageUsers", "getProducts"],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
