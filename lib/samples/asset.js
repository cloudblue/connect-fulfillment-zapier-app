module.exports = {
  id: 'AS-0126-3396-8831',
  status: 'terminating',
  external_uid: '275a1b3e-bb14-4922-815c-23d9fd0f8192',
  product: {
      id: 'PRD-150-215-020',
      icon: '/media/VA-322-392/PRD-150-215-020/media/PRD-150-215-020-logo_SRk4cjX.png',
      name: 'Sample product',
      status: 'published'
  },
  connection: {
      id: 'CT-7795-3282',
      type: 'production',
      status: 'approved',
      provider: {
          id: 'PA-781-184',
          name: 'FF Test Provider'
      },
      vendor: {
          id: 'VA-322-392',
          name: 'FF Test Vendor 1'
      },
      hub: {
          id: 'HB-3985-8517',
          name: 'My production HUB'
      },
      created_at: '2019-12-05T09:11:22+00:00'
  },
  events: {
      updated: {
          at: '2020-01-22T12:35:59+00:00'
      },
      created: {
          at: '2019-12-19T15:36:49+00:00'
      }
  },
  items: [
      {
          period: 'Monthly',
          old_quantity: '5',
          display_name: '1Password for Business subscription',
          item_type: 'Reservation',
          mpn: '1PB',
          type: 'Users',
          id: 'SKU_A',
          global_id: 'PRD-150-215-020-0001',
          quantity: '5'
      }
  ],
  params: [
      {
          value: 'email@example.com',
          value_error: '',
          title: 'Admin account email',
          description: 'Enter the email for the admin account to receive the activation link',
          type: 'text',
          scope: 'asset',
          phase: 'ordering',
          constraints: {
              hidden: false,
              required: true,
              unique: false
          },
          id: 'admin_email'
      },

  ],
  tiers: {
      customer: {
          external_uid: '4ee63a1b-313a-40be-803d-3c0ada40efde',
          id: 'TA-1927-3066-0654',
          name: 'Cust Company',
          contact_info: {
              address_line2: 'Cust Address 2',
              city: 'Barcelona',
              address_line1: 'Cust Address 1',
              country: 'US',
              state: 'Barcelona',
              contact: {
                  phone_number: {
                      phone_number: '5588656',
                      area_code: '646',
                      extension: '1234',
                      country_code: '+1'
                  },
                  first_name: 'Cust First Name',
                  last_name: 'Cust Last Name',
                  email: 't1@example.com'
              },
              postal_code: '08010'
          }
      },
      tier1: {
          external_uid: 'f40743a3-5e05-40a1-87f8-e1d019e5f3e5',
          external_id: '2',
          id: 'TA-8189-1894-3809',
          name: 'T1 Company',
          contact_info: {
              address_line2: 'T1 Address 2',
              city: 'Barcelona',
              address_line1: 'T1 Address 1',
              country: 'ES',
              state: 'Barcelona',
              contact: {
                  phone_number: {
                      phone_number: '931221212',
                      area_code: '',
                      extension: '',
                      country_code: '+34'
                  },
                  first_name: 'T1 First Name',
                  last_name: 'T1 Last Name',
                  email: 't1@example.com'
              },
              postal_code: '08010'
          }
      },
  },
  configuration: {
      params: []
  },
  marketplace: {
      id: 'MP-74941',
      name: 'Direct commerce',
      icon: '/media/PA-781-184/marketplaces/MP-74941/icon.jpg'
  },
  contract: {
      id: 'CRD-60676-55489-39673',
      type: 'distribution',
      name: 'Contract of Distribute to Spain'
  }
};