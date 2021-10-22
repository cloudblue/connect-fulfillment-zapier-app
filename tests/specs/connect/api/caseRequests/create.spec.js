/**
 * This file is part of the Ingram Micro Cloud Blue Connect Zapier Extension.
 *
 * @copyright (c) 2020 - 2021 Ingram Micro, Inc. All Rights Reserved.
 */
/*
jest.mock('@cloudblueconnect/connect-javascript-sdk', () => {
  return {
    ConnectClient: jest.fn(),
    Cases: jest.fn(),
  }
});
*/
const { ConnectClient } = require('@cloudblueconnect/connect-javascript-sdk');

const {
  createCaseRequest, 
  updateCaseRequest, 
  createCommentByCaseId,
} = require('../../../../../lib/connect/api/caseRequests/create');

describe('caseCreate', () => {
  let client;

  beforeAll(() => {
    client = new ConnectClient('https://localhost', '1234567890');
  });
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const createCaseData = {
    product_id: 'PRD-000',
    subject: 'Subject',
    description: 'Some form of description',
    priority: 0,
    type: 'business',
    issuer_recipients: [
      {
        id: 'UR-000-000-000',
        name: 'Some Name'
      },
      {
        id: 'UR-000-000-001',
        name: 'Some Name1'
      }
    ],
    account_id: 'PA-000-000-000',    
  };

  const createCaseExpectedPayload = {
    subject: 'Subject',
    product: { 
      id: 'PRD-000'
    },
    description: 'Some form of description',
    priority: 0,
    type: 'business',
    issuer: {
      recipients: [
        {
          id: 'UR-000-000-000',
          name: 'Some Name'
        },
        {
          id: 'UR-000-000-001',
          name: 'Some Name1'
        }
      ]
    },
    receiver: {
      account: { id: 'PA-000-000-000'}
    },
  };

  const updateCaseData = {
    case_id: 'CA-000',
    product_id: 'PRD-000',
    subject: 'Subject',
    description: 'Some form of description',
    issuer_account: 'VA-002',
    issuer_actor: 'UR-0001',
    issuer_recipients: [{
      id: 'UR-002',
    }],
    receiver_account: 'PA-002',
    receiver_actor: 'UR-0003',
    receiver_recipients: [{
      id: 'UR-004',
    }]
  };

  const updateCaseExpectedPayload = {
    product: { 
      id: 'PRD-000'
    },
    subject: 'Subject',
    description: 'Some form of description',
    issuer: {
      account: { id: 'VA-002' },
      actor: { id: 'UR-0001' },
      recipients:[{ id: 'UR-002' }],
    },
    receiver: {
      account: { id:'PA-002' },
      actor: { id: 'UR-0003' },
      recipients:[{ id: 'UR-004' }]
    }
  };

  it('createCases', async () => {
    const mockedFn = jest.fn();
    mockedFn.mockReturnValue({id: 'CA-000'});
    client.cases.create = mockedFn;
    await createCaseRequest(client, createCaseData);
    expect(mockedFn).toHaveBeenCalledWith(createCaseExpectedPayload);
  });

  it('updateCases', async () => {
    const mockedFn = jest.fn();
    mockedFn.mockReturnValue({});
    client.cases.update = mockedFn;
    await updateCaseRequest(client, updateCaseData);
    expect(mockedFn).toHaveBeenCalledWith('CA-000', updateCaseExpectedPayload);
  });

  it('createMessage', async () => {
    const mockedFn = client.conversations.createMessage = jest.fn();
    mockedFn.mockReturnValue('CA-000', 'hello world');  
    const data = {
      case_id: 'CA-000',
      text: 'hello world',
    };
    await createCommentByCaseId(client, data);
    expect(mockedFn).toHaveBeenCalledWith('CA-000', 'hello world');
  });
});