/**
 * This file is part of the Ingram Micro Cloud Blue Connect Zapier Extension.
 *
 * @copyright (c) 2020 Ingram Micro, Inc. All Rights Reserved.
 */


module.exports = {
  id: 'TC-192-223-965',
  name: 'Configuration of TA-8189-1894-3809',
  account: {
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
  product: {
    id: 'PRD-150-215-020',
    icon: '/media/VA-322-392/PRD-150-215-020/media/PRD-150-215-020-logo_SRk4cjX.png',
    name: 'Sample product',
    status: 'published'
  },
  tier_level: 1,
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
  marketplace: {
    id: 'MP-74941',
    name: 'Direct commerce',
    icon: '/media/PA-781-184/marketplaces/MP-74941/icon.jpg'
  },
  contract: {
    id: 'CRD-60676-55489-39673',
    type: 'distribution',
    name: 'Contract of Distribute to Spain'
  },
  template: {
    representation: '# Sample Template For Setup of Tier 1\n\nThis template is used to share details of the **successful** setup configuration of reseller of 1st level.\n\nThis template uses **[Markdown](https://en.wikipedia.org/wiki/Markdown)** syntax and allows to use Parameters of the product which have scope \'Tier 1\'.\n\n### Formatting\n\nMarkdown allows you to control various aspects of the document:\n\n1. Text formatting like **bold** or *italic*\n2. Images embedding\n3. Lists\n4. and more\n\n### Parameters\n\nYou can refer to the Parameters using their ID, like in the following example:\n\n* The value of **param_a** is ****\n* The value of **param_b** is ****\n\nYou can also embed pictures like the one below:\n\n![logo](https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Ringworld_Waiting.jpg/270px-Ringworld_Waiting.jpg)',
    id: 'TL-227-332-345',
    name: 'Default Activation Template'
  },
  status: 'active',
}