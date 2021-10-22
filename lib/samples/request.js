module.exports = {
    id: 'PR-4766-8557-9657-001',
    type: 'purchase',
    note: '',
    asset:
    {
        id: 'AS-4766-8557-9657',
        status: 'active',
        external_id: 'RGGMUXGQQ9',
        external_uid: '560d551a-f03b-4c84-9c67-9b2a13e20e4a',
        product:
        {
            id: 'PRD-350-146-687',
            icon: '/media/VA-322-392/PRD-350-146-687/media/PRD-350-146-687-logo_xYmEUml.png',
            name: 'FlyMeToTheHost',
            status: 'published'
        },
        connection:
        {
            type: 'preview',
            vendor: { id: 'VA-322-392', name: 'FF Test Vendor 1' },
            id: 'CT-0000-0000-0000',
            hub: { id: 'HB-0000-0000', name: 'ACME Hub' },
            provider: { id: 'PA-781-184', name: 'FF Test Distributor' }
        },
        events:
        {
            updated: { at: '2019-11-18T10:06:52+00:00' },
            created: { at: '2019-11-18T09:37:32+00:00' }
        },
        items:
            [{
                period: 'Monthly',
                old_quantity: '0',
                display_name: 'FlyMeToTheHost - Team Plan',
                item_type: 'Reservation',
                mpn: 'The Team Plan',
                params: [],
                type: 'Users',
                id: 'THE_TEAM_PLAN',
                global_id: 'PRD-350-146-687-0002',
                quantity: '3'
            },
            {
                period: 'Monthly',
                old_quantity: '0',
                display_name: 'FlyMeToTheHost Basic Plan',
                item_type: 'Reservation',
                mpn: 'The Basic subscription plan',
                params: [],
                type: 'Users',
                id: 'THE_BASIC_SUBSCRIPTION_PLAN',
                global_id: 'PRD-350-146-687-0001',
                quantity: '3'
            }],
        params:
            [{
                name: 'admin_email',
                value_choices: [],
                title: 'Admin email address',
                value_error: '',
                type: 'text',
                id: 'admin_email',
                value: 'fgfdgdfg',
                description: 'The admin email address needed to create the admin account'
            },
            {
                name: 'company_name',
                value_choices: [],
                title: 'Company name',
                value_error: '',
                type: 'text',
                id: 'company_name',
                value: 'dfgdfgdf',
                description: 'The Company name for this subscription'
            }],
        tiers:
        {
            customer:
            {
                external_uid: 'ffad29ed-8715-4104-8cc5-cab3b1cea16a',
                id: 'TA-7292-9691-1403',
                name: 'Koelpin Inc',
                contact_info:
                {
                    address_line2: 'Franecki Plaza',
                    city: 'Meta',
                    address_line1: 'Chelsie Place',
                    country: 'IT',
                    state: 'Abruzzi',
                    contact:
                    {
                        phone_number:
                        {
                            phone_number: '5558312',
                            area_code: '368',
                            extension: '',
                            country_code: '+39'
                        },
                        first_name: 'Albert',
                        last_name: 'Einstein',
                        email: 'ffaraone+Albert_Einstein@gmail.com'
                    },
                    postal_code: '67030'
                }
            },
            tier1:
            {
                external_uid: 'e85a2231-0cca-47b2-8b16-d4e01df80d18',
                id: 'TA-7259-2593-8257',
                name: 'Veum LLC',
                contact_info:
                {
                    address_line2: 'Franecki Plaza',
                    city: 'Meta',
                    address_line1: 'Chelsie Place',
                    country: 'IT',
                    state: 'Abruzzi',
                    contact:
                    {
                        phone_number:
                        {
                            phone_number: '5558312',
                            area_code: '368',
                            extension: '',
                            country_code: '+39'
                        },
                        first_name: 'Peppe',
                        last_name: 'Lanzetta',
                        email: 'ffaraone+Peppe_Lanzetta@gmail.com'
                    },
                    postal_code: '67030'
                }
            },
            tier2:
            {
                external_uid: '01f3020f-9a20-4f1e-9237-94974731731f',
                external_id: '27648',
                id: 'TA-6877-3774-3365',
                name: 'Witting Inc',
                contact_info:
                {
                    address_line2: 'Eliseo Motorway',
                    city: 'Meta',
                    address_line1: 'Laurine Ville',
                    country: 'IT',
                    state: 'Abruzzi',
                    contact:
                    {
                        phone_number:
                        {
                            phone_number: '5558312',
                            area_code: '368',
                            extension: '',
                            country_code: '+39'
                        },
                        first_name: 'Kadin',
                        last_name: 'Gibson',
                        email: 'ffaraone+Kadin_Gibson@gmail.com'
                    },
                    postal_code: '67030'
                }
            }
        },
        configuration: { params: [] },
        marketplace:
        {
            id: 'MP-06105',
            name: 'ToItaly',
            icon: '/media/PA-781-184/marketplaces/MP-06105/icon.png'
        },
        contract:
        {
            id: 'CRD-00000-00000-00000',
            name: 'ACME Distribution Contract'
        }
    },
    reason: '',
    status: 'approved',
    created: '2019-11-18T09:37:33+00:00',
    updated: '2019-11-18T10:06:52+00:00',
    answered: false,
    assignee: '',
    activation_key: '# Sample Activation Template\n\nActivation template is used to share details of the **successful** asset creation with the user. Once purchase request is approved, this template is used to generate user-visible notification.\n\nThis template uses **[Markdown](https://en.wikipedia.org/wiki/Markdown)** syntax and allows to use Parameters of the product which has scope \'Asset\'.\n\n### Formatting\n\nMarkdown allows you to control various aspects of the document:\n\n1. Text formatting like **bold** or *italic*\n2. Images embedding\n3. Lists\n4. and more\n\n### Parameters\n\nYou can refer to the Parameters using their ID, like in the following example:\n\n* The value of **param_a** is ****\n* The value of **param_b** is ****\n\nYou can also embed pictures like the one below:\n\n![logo](https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Ringworld_Waiting.jpg/270px-Ringworld_Waiting.jpg)',
    marketplace:
    {
        id: 'MP-06105',
        name: 'ToItaly',
        icon: '/media/PA-781-184/marketplaces/MP-06105/icon.png'
    },
    contract:
    {
        id: 'CRD-00000-00000-00000',
        name: 'ACME Distribution Contract'
    }
}
