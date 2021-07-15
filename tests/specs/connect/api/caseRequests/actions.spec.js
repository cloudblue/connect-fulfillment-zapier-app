/**
 * This file is part of the Ingram Micro Cloud Blue Connect Zapier Extension.
 *
 * @copyright (c) 2020 Ingram Micro, Inc. All Rights Reserved.
 */

const { ConnectClient } = require('@cloudblueconnect/connect-javascript-sdk');

const {
  searchCases,
  searchCaseComments,
  pendCaseRequest,
  inquireCaseRequest,
  resolveCaseRequest,
  closeCaseRequest, 
} = require('../../../../../lib/connect/api/caseRequests/actions');

const { searchConversations } = require('../../../../../lib/connect/api/misc');

describe('caseRequests.actions', () => {
  let client;

  beforeAll(() => {
    client = new ConnectClient('https://localhost', '1234567890');
  });
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('searchCases all', async () => {
    const mockedFn = jest.fn();
    mockedFn.mockReturnValue([]);
    client.cases.search = mockedFn;
    const data = {
      case_id: 'CA-000-000-000',
      created_before: '2019-12-05T09:11:22+00:00',
      created_after: '2019-12-01T09:11:22+00:00'
    };
    await searchCases(client, data);
    expect(mockedFn).toHaveBeenCalledWith({
      created: {
        $ge: '2019-12-01T09:11:22.000Z',
        $le: '2019-12-05T09:11:22.000Z'
      },
      offset: 0,
      limit: 100,
    });
  });

  it('searchCases all no dates', async () => {
    const mockedFn = jest.fn();
    mockedFn.mockReturnValue([]);
    client.cases.search = mockedFn;
    const data = {
      case_id: 'CA-000-000-000',
    };
    await searchCases(client, data);
    expect(mockedFn).toHaveBeenCalledWith({
      offset: 0,
      limit: 100,
    });
  });  

  it('searchCaseComments Dates', async () => {
    const mockedFn = jest.fn();
    mockedFn.mockReturnValue([]);
    client.conversations.messages('CA-000-000-000').search = mockedFn;
    const data = {
      case_id: 'CA-000-000-000',
      created_before: '2019-12-05T09:11:22+00:00',
      created_after: '2019-12-01T09:11:22+00:00'
    };
    await searchCaseComments (client, data);
    expect(mockedFn).toHaveBeenCalledWith({
      created: {
        $ge: '2019-12-01T09:11:22.000Z',
        $le: '2019-12-05T09:11:22.000Z'
      },
      limit: 100,
      offset: 0  
    });
  });


  it('searchCaseComments No Dates', async () => {
    const mockedFn = jest.fn();
    mockedFn.mockReturnValue([]);
    client.conversations.messages('CA-000-000-000').search = mockedFn;
    const data = {
      case_id: 'CA-000-000-000'
    };
    await searchCaseComments (client, data);
    expect(mockedFn).toHaveBeenCalledWith({
      limit: 100,
      offset: 0  
    });
  });

  it('searchCaseComments no case id', async () => {
    const mockedSearchCasesFn = jest.fn();
    mockedSearchCasesFn.mockReturnValue([
        { id: 'CA-000' }
    ]);
    client.cases.search = mockedSearchCasesFn;
    const mockedMessagesFn = jest.fn();
    const mockedSearchMessagesFn = jest.fn();
    mockedMessagesFn.mockReturnValue({ search: mockedSearchMessagesFn});
    mockedSearchMessagesFn.mockReturnValue([{ id: 'ME-001' },{ id: 'ME-002' }])

    client.conversations.messages = mockedMessagesFn; 
    const data = {
      case_status: 'inquiring',
      limit: 100,
      offset: 0
    };
    const result = await searchCaseComments(client, data);
    const messages = await result; 
    expect(mockedMessagesFn).toHaveBeenCalledWith('CA-000');
    expect(messages).toStrictEqual([
        { id: 'ME-001', case: 'CA-000' },
        { id: 'ME-002', case: 'CA-000' }
    ]);
  });

  it('searchCaseComments case id', async () => {
    const mockedMessagesFn = jest.fn();
    const mockedSearchMessagesFn = jest.fn();
    mockedMessagesFn.mockReturnValue({ search: mockedSearchMessagesFn});
    mockedSearchMessagesFn.mockReturnValue([{ id: 'ME-001' },{ id: 'ME-002' }])

    client.conversations.messages = mockedMessagesFn; 
    const data = {
      case_id: 'CA-000',
      limit: 100,
      offset: 0
    };
    const result = await searchCaseComments(client, data);
    const messages = await result; 
    expect(mockedMessagesFn).toHaveBeenCalledWith('CA-000');
    expect(messages).toStrictEqual([
        { id: 'ME-001', case: 'CA-000' },
        { id: 'ME-002', case: 'CA-000' }
    ]);
  });


  it.each([
    ['inquireCaseRequest', { case_id: 'CA-000-000', message: 'test' }, 'inquire', inquireCaseRequest],
    ['resolveCaseRequest', { case_id: 'CA-000-000' }, 'resolve', resolveCaseRequest],
    ['pendCaseRequest', { case_id: 'CA-000-000' }, 'pend', pendCaseRequest],
  ])('%s', async (testcase, data, type, fn) => {
    const mockedFn = jest.fn();
    mockedFn.mockReturnValue({id: 'CA-000'});
    client.cases[type] = mockedFn;
    await fn(client, data);
    expect(mockedFn).toHaveBeenCalledWith('CA-000-000');  
  });

  it('closeCase', async () => {
    const data = {case_id: 'CA-000', rating: 3, feedback: 'Cool'};
    const mockedFn = jest.fn();
    mockedFn.mockReturnValue(data);
    client.cases.close = mockedFn;
    await closeCaseRequest(client, data);
    expect(mockedFn).toHaveBeenCalledWith('CA-000', 3, 'Cool');  
  });
});

