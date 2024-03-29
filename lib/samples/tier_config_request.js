module.exports = {
  id: 'TCR-256-676-192-001',
  type: 'setup',
  status: 'pending',
  configuration: {
    id: 'TC-256-676-192',
    name: 'Configuration of TA-4487-1987-3778',
    account: {
      external_uid: 'e477f0e8-8590-4bf6-aa6b-e1c780a4c287',
      external_id: '92979',
      id: 'TA-4487-1987-3778',
      name: 'Jacobson, Moore and Shields',
      contact_info: {
        address_line2: 'Maci Manors',
        city: 'Ceuta',
        address_line1: 'Felicity Walk',
        country: 'ES',
        state: 'Ceuta',
        contact: {
          phone_number: {
            phone_number: '',
            area_code: '',
            extension: '',
            country_code: ''
          },
          first_name: 'Gussie',
          last_name: 'Luettgen',
          email: 'ffaraone+Gussie_Luettgen@gmail.com'
        },
        postal_code: '51004'
      }
    },
    product: {
      id: 'PRD-150-215-020',
      icon: '/media/VA-322-392/PRD-150-215-020/media/PRD-150-215-020-logo_SRk4cjX.png',
      name: '1Password for Business',
      status: 'published'
    },
    tier_level: 1,
    connection: {
      type: 'preview',
      vendor: {
        id: 'VA-322-392',
        name: 'FF Test Vendor 1'
      },
      id: 'CT-0000-0000-0000',
      hub: {
        id: 'HB-0000-0000',
        name: 'ACME Hub'
      },
      provider: {
        id: 'PA-781-184',
        name: 'FF Test Distributor'
      }
    },
    events: {
      updated: {
        at: '2019-12-20T14:48:59+00:00'
      },
      created: {
        at: '2019-12-20T14:48:59+00:00'
      }
    },
    params: [
      {
        id: 'gift_code',
        title: 'Gift code',
        description: 'Gift code',
        type: 'text',
        scope: 'tier1',
        phase: 'ordering',
        constraints: {
          hidden: false,
          required: true,
          unique: false
        }
      }
    ],
    open_request: {
      id: 'TCR-256-676-192-001'
    },
    status: 'processing',
    marketplace: {
      id: 'MP-74941',
      name: 'Direct commerce',
      icon: '/media/PA-781-184/marketplaces/MP-74941/icon.jpg'
    }
  },
  events: {
    inquired: {
      at: '2019-12-20T14:48:59+00:00'
    },
    updated: {
      at: '2019-12-20T14:58:07+00:00',
      by: {
        id: 'SU-321-380-460',
        name: 'key_4_vendor'
      }
    },
    pended: {
      at: '2019-12-20T14:57:34+00:00',
      by: {
        id: 'SU-321-380-460',
        name: 'key_4_vendor'
      }
    },
    created: {
      at: '2019-12-20T14:48:59+00:00'
    }
  },
  params: [
    {
      value: 'abcdef',
      title: 'Gift code',
      description: 'Gift code',
      type: 'text',
      scope: 'tier1',
      phase: 'ordering',
      constraints: {
        hidden: false,
        required: true,
        unique: false
      },
      id: 'gift_code'
    }
  ],
  assignee: {
    id: 'SU-321-380-460',
    name: 'key_4_vendor'
  },
  notes: 'Hello notes',
  environment: 'preview',
  tiers: {
    tier1: {
      external_uid: 'e477f0e8-8590-4bf6-aa6b-e1c780a4c287',
      external_id: '92979',
      id: 'TA-4487-1987-3778',
      name: 'Jacobson, Moore and Shields',
      contact_info: {
        address_line2: 'Maci Manors',
        city: 'Ceuta',
        address_line1: 'Felicity Walk',
        country: 'ES',
        state: 'Ceuta',
        contact: {
          phone_number: {
            phone_number: '',
            area_code: '',
            extension: '',
            country_code: ''
          },
          first_name: 'Gussie',
          last_name: 'Luettgen',
          email: 'ffaraone+Gussie_Luettgen@gmail.com'
        },
        postal_code: '51004'
      }
    },
    tier2: null
  }
};
