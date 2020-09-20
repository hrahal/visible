export const projectServiceHelplerMocks = {
  input: {
    users: [
      {
        'id': 'f3e868b9-6151-49c4-8d51-b9e3fb9255ba',
        'first_name': 'Corty',
        'last_name': 'Wetton',
        'email': 'corty.wetton@acme.com',
        'department': 'marketing',
        'role': 'manager',
      },
      {
        'id': '3f949e89-4d40-48fb-b43c-da20e7c768aa',
        'first_name': 'Freemon',
        'last_name': 'Courage',
        'email': 'freemon.courage@acme.com',
        'department': 'marketing',
        'role': 'employee',
      },
    ]
  },
  output: {
    manager: {
      'id': 'f3e868b9-6151-49c4-8d51-b9e3fb9255ba',
      'first_name': 'Corty',
      'last_name': 'Wetton',
      'email': 'corty.wetton@acme.com',
      'department': 'marketing',
      'role': 'manager',
    },
    employee: {
      'id': '3f949e89-4d40-48fb-b43c-da20e7c768aa',
      'first_name': 'Freemon',
      'last_name': 'Courage',
      'email': 'freemon.courage@acme.com',
      'department': 'marketing',
      'role': 'employee',
    }
  }
};
