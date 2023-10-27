const allRoles = {
  user: ["getUser", "manageCow", "getCows", "manageUser", "authCek"],
  puskeswan: ["getUser", "manageUser", "manageCow", "getCows", "authCek"],
  admin: [
    "getUsers",
    "getUser",
    "manageUsers",
    "manageUser",
    "manageCow",
    "getCows",
    "authCek",
  ],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
