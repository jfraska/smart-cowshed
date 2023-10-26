const allRoles = {
  user: ["getUser", "manageCow", "getCows", "manageUser", "authCek"],
  admin: ["getUsers", "manageUsers", "authCek"],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
