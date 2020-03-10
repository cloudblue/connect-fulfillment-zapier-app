module.exports = {
  id: 'TAR-0000-0000-0000-001-001',
  type: 'update',
  status: 'unsupported',
  account: {
    id: 'TA-6643-3675-2325',
    environment: 'production',
    name: 'Test TAR',
    external_id: '1',
    external_uid: '0527f876-13ea-47b3-818a-8a8a16581764',
    events: {
      created: {
        at: '2020-03-10T13:10:34+00:00',
        by: {
          id: 'SU-440-944-203',
          name: 'test4zapier',
        },
      },
      updated: {
        at: '2020-03-10T13:10:34+00:00',
      },
    },
    scopes: [
      'customer',
    ],
    marketplace: {
      id: 'MP-62338',
      name: 'M01',
      icon: '/media/logo_marketplace_1.png',
    },
    hub: {
      id: 'HB-1500-4786',
      name: 'Demo hub',
    },
    version: 2,
    contact_info: {
      address_line1: 'Passeig de Gracia, 44',
      address_line2: '',
      city: 'Barcelona',
      state: 'Spain',
      postal_code: '08001',
      country: 'ES',
      contact: {
        first_name: 'First',
        last_name: 'Last',
        email: 'flast@example.com',
        phone_number: {
          country_code: '+34',
          area_code: '93',
          phone_number: '1221111',
          extension: '',
        },
      },
    },
  },
  vendor: {
    id: 'VA-718-924',
    name: 'Vendor company',
  },
  provider: {
    id: 'PA-436-240',
    name: 'Provider company',
  },
  product: {
    id: 'PRD-305-066-868',
    icon: '/media/VA-718-924/PRD-305-066-868/media/PRD-305-066-868-logo.png',
    name: 'A product that just works!',
    status: 'published',
  },
  reason: 'Product does not support contact details change.',
  events: {
    created: {
      at: '2020-03-10T13:28:58+00:00',
      by: {
        id: 'SU-440-944-203',
        name: 'test4zapier',
      },
    },
    updated: {
      at: '2020-03-10T13:28:58+00:00',
    },
  },
};
