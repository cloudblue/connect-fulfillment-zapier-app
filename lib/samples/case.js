module.exports ={
    'id': 'CA-000-000-000',
    'product': {                                                // optional
        'id': 'PRD-000-000-000',
        'title': 'Some Product',
        'logo': 'https://example.com',
    },
    'subject': 'Subject',
    'description': 'Some form of description',
    'priority': 0,                                              // 0 - low, 1 - medium, 2 - high, 3 - urgent
    'type': 'technical',                                        // technical or business
    'state': {                                                  // options: pending, inquiring, resolved, closed
        'current': 'pending',                                          
        'next': ['inquiring', 'resolved'],
        'all': ['pending', 'inquiring', 'resolved', 'closed']
    },
    'from': {
        'account': {'id': 'VA-000-000-000'},
        'actor': {'id': 'UR-000-000-000'},
        'cc': [
            {'id': 'UR-000-000-000'}
        ]
    },
    'to': {
        'account': {'id': 'PA-000-000-000'},
        'actor': {'id': 'UR-000-000-003'},
        'cc': [
            {'id': 'UR-000-000-003'}
        ]
    },
    'events': {
        'created': {
            'at': '2018-12-18T13:33:32+00:00',
            'by': {
                'id': 'UR-000-000-000',
                'name': 'Some User'
            }
        },
        'updated': {
            'at': '2019-12-18T13:33:32+00:00',
            'by': {
                'id': 'UR-000-000-000',
                'name': 'Some User'
            }
        },
        'pending': {
            'at': '2019-12-18T13:33:32+00:00',
            'by': {
                'id': 'UR-000-000-000',
                'name': 'Some User'
            }
        },
        'inquiring': {
            'at': '2019-12-18T13:33:32+00:00',
            'by': {
                'id': 'UR-000-000-000',
                'name': 'Some User'
            }
        },
        'resolved': {
            'at': '2019-12-18T13:33:32+00:00',
            'by': {
                'id': 'UR-000-000-000',
                'name': 'Some User'
            }
        },
        'closed': {
            'at': '2019-12-18T13:33:32+00:00',
            'by': {
                'id': 'UR-000-000-000',
                'name': 'Some User'
            }
        },
    }
};