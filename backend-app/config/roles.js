const allRoles = {
  user: ["getUser", "manageCows", "getCows"],
  admin: ["getUsers", "manageUsers"],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
