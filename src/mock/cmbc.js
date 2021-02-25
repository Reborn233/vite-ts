import Mock from 'mockjs';
Mock.setup({
  timeout: '200-1000'
})

Mock.mock(new RegExp('/autocloud/account/asserts/query'), 'post', () => {
  return {
    "code": "000000",
    "message": "success",
    "content": {
      "prodTotalAmount": "0.10",
      "availableBalance": "0.20",
      "protocolAcNo": "191070011005444336"
    },
    "succeeded": true
  }
});

Mock.mock(new RegExp('/autocloud/account/asserts/cashOut'), 'post', () => {
  return {
    "code": "000000",
    "message": "success",
    "content": {
      "reqNo": "XH_1613793697999",
      "amount": "0.01",
      "protocolAcNo": "191070011005444336",
      "remark": "出金到银行卡",
      "status": "0",
      "message": "处理成功"
    },
    "succeeded": true
  }
});

Mock.mock(new RegExp('/autocloud/account/asserts/sendCloseCode'), 'post', () => {
  return {
    "code": "000000",
    "message": "success",
    "content": "150****9145",
    "succeeded": true
  }
});

Mock.mock(new RegExp('/autocloud/account/asserts/closeAccount'), 'post', () => {
  return {
    "code": "000000",
    "message": "success",
    "content": {
      "message": "处理成功"
    },
    "succeeded": true
  }
});
