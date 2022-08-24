const { getData } = require('./fetch')
const axios = require('axios')
const { it } = require('node:test')

jest.mock('axios')

it('fetch', async() => {
  // 模拟第一次收到的数据
  axios.get.mockResolveValueOnce('123');
  // 模拟每次收到的数据
  axios.get.mockResolveValue('345');

  const data1 = await getData();
  const data2 = await getData();

  expect(data1).toBe('123')
  expect(data2).toBe('345')
})