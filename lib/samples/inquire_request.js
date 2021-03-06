module.exports = {
    "id": "PR-6298-1377-1527-001",
    "type": "purchase",
    "note": "",
    "asset": {
        "id": "AS-6298-1377-1527",
        "status": "processing",
        "external_id": "498H38NJ3S",
        "external_uid": "f235da48-c83b-4272-8b24-1cc64435541e",
        "product": {
            "id": "PRD-610-426-339",
            "icon": "/media/VA-306-697/PRD-610-426-339/media/PRD-610-426-339-logo_ac5hqg5.png",
            "name": "Ordering Product",
            "status": "published"
        },
        "connection": {
            "type": "preview",
            "vendor": {
                "id": "VA-306-697",
                "name": "CloudBlueTestVendor"
            },
            "id": "CT-0000-0000-0000",
            "hub": {
                "id": "HB-0000-0000",
                "name": "ACME Hub"
            },
            "provider": {
                "id": "PA-325-330",
                "name": "CloudBlueTestProvider"
            }
        },
        "events": {
            "updated": {
                "at": "2019-12-03T17:03:29+00:00"
            },
            "created": {
                "at": "2019-12-03T16:52:23+00:00"
            }
        },
        "items": [
            {
                "period": "Monthly",
                "old_quantity": "0",
                "display_name": "Item 1",
                "item_type": "PPU",
                "mpn": "MPN-A_Item_001",
                "type": "Un",
                "id": "SKU_A",
                "global_id": "PRD-610-426-339-0001",
                "quantity": "-1"
            }
        ],
        "params": [
            {
                "name": "param_a",
                "value_choices": [],
                "title": "Title of the Parameter A",
                "value_error": "",
                "type": "text",
                "id": "param_a",
                "value": "parameter content",
                "description": "Description of the Parameter A"
            }
        ],
        "tiers": {
            "customer": {
                "external_uid": "6a7c9129-3e35-4796-99fc-f01bbd33d342",
                "external_id": "9006",
                "id": "TA-5887-9147-3207",
                "name": "Pirulo ands sons",
                "contact_info": {
                    "address_line2": "Wehner Hills",
                    "city": "Ceuta",
                    "address_line1": "Littel Island",
                    "country": "ES",
                    "state": "Ceuta",
                    "contact": {
                        "phone_number": {
                            "phone_number": "",
                            "area_code": "",
                            "extension": "",
                            "country_code": ""
                        },
                        "first_name": "Marley",
                        "last_name": "Windler",
                        "email": "martin.constante@gmail.com"
                    },
                    "postal_code": "51004"
                }
            },
            "tier1": {
                "external_uid": "90b6984b-0f9a-451f-8a32-247c005692dc",
                "external_id": "18093",
                "id": "TA-2599-7781-9264",
                "name": "Hegmann - Kutch",
                "contact_info": {
                    "address_line2": "Lang Inlet",
                    "city": "Ceuta",
                    "address_line1": "Verner Lakes",
                    "country": "ES",
                    "state": "Ceuta",
                    "contact": {
                        "phone_number": {
                            "phone_number": "",
                            "area_code": "",
                            "extension": "",
                            "country_code": ""
                        },
                        "first_name": "Xander",
                        "last_name": "Wuckert",
                        "email": "martin.constante+Xander_Wuckert@gmail.com"
                    },
                    "postal_code": "51004"
                }
            },
            "tier2": {}
        },
        "marketplace": {
            "id": "MP-30756",
            "name": "Spain Marketplace",
            "icon": "/media/PA-325-330/marketplaces/MP-30756/icon.png"
        },
        "contract": {
            "id": "CRD-00000-00000-00000",
            "name": "ACME Distribution Contract"
        }
    },
    "reason": "",
    "status": "inquiring",
    "created": "2019-12-03T16:52:23+00:00",
    "updated": "2019-12-03T17:03:29+00:00",
    "answered": false,
    "assignee": {
        "email": "",
        "id": "SU-769-717-535",
        "name": "providerToken"
    },
    "activation_key": "",
    "template": {
        "message": "# Sample Activation Template\n\nActivation template is used to share details of the **successful** asset creation with the user. Once purchase request is approved, this template is used to generate user-visible notification.\n\nThis template uses **[Markdown](https://en.wikipedia.org/wiki/Markdown)** syntax and allows to use Parameters of the product which has scope 'Asset\n### Formatting\n\nMarkdown allows you to control various aspects of the document:\n\n1. Text formatting like **bold** or *italic*\n2. Images embedding\n3. Lists\n4. and more\n\n### Parameters\n\nYou can refer to the Parameters using their ID, like in the following example:\n\n* The value of **param_a** is **parameter content**\n\n\n",
        "id": "TL-827-840-476",
        "name": "Default Activation Template"
    },
    "marketplace": {
        "id": "MP-30756",
        "name": "Spain Marketplace",
        "icon": "/media/PA-325-330/marketplaces/MP-30756/icon.png"
    },
    "contract": {
        "id": "CRD-00000-00000-00000",
        "name": "ACME Distribution Contract"
    },
    "params_form_url": "https://customer.cnct.tech/?code=JtIFsmfXXdpM4cjr&request_id=PR-6298-1377-1527-001"
}