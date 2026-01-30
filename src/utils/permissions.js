export const PERMISSIONS = {
  intern: {
    viewList: true,
    viewDetails: false,
    admit: false,
  },
  staff: {
    viewList: true,
    viewDetails: true,
    admit: false,
  },
  management: {
    viewList: true,
    viewDetails: true,
    admit: true,
  },
  admin: {
    viewList: true,
    viewDetails: true,
    admit: true,
    edit: true,
    delete: true,
  },
};

export const can = (role, action) =>
  PERMISSIONS[role]?.[action] ?? false;
