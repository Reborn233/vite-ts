import './style.less';
import $ from './libs/utils';
import toast from './libs/toast';
import showSuccess from './libs/success';
import showError from './libs/error';
import Api from './libs/api';
// 模拟数据用于本地调试，build 需注释
import './mock/cmbc';

// 事件绑定装饰器
function bindEvent(select: string, eventName: string = 'click') {
  return function (target: any, name: any) {
    const func = target[name];
    $(select).on(eventName, func.bind(target));
  };
}

const ONE_MINUTE = 120;

const SUCCESS_CODE = '000000';

let service: Api;
let timer: any = null;
let num: number = ONE_MINUTE;
// 销户逻辑处理
class App {
  async init() {
    try {
      const res = await service.query();
      if (res.code === SUCCESS_CODE) {
        $('#withdraw').removeClass('btn-disabled');
        const availableBalance = res.content.availableBalance;
        const prodTotalAmount = res.content.prodTotalAmount;
        const amount = $.sum(availableBalance, prodTotalAmount);
        if (amount === '0.00') {
          this.showCloseAccount();
        }
        $('#amount').text(amount);
      } else {
        showSuccess();
      }
    } catch (error) {}
  }
  @bindEvent('body')
  hidePopper() {
    $('.popper').hide();
  }
  // 点击问号弹窗
  @bindEvent('.icon')
  clickPopper(e: Event) {
    e.stopPropagation();
    const target = e.target;
    let id = $(target).data('target');
    $('.popper').hide();
    $(id).show();
  }
  // 提现
  @bindEvent('#withdraw')
  async withdraw() {
    const loading = $.btnLoading('#withdraw', '提现中...');
    try {
      const res = await service.cashOut();
      if (res.code === SUCCESS_CODE) {
        loading.hide('已提现');
        $('#amount').text('0.00');
        this.showCloseAccount();
      } else {
        loading.hide();
        toast(res.message);
      }
    } catch (error) {
      loading.hide();
    }
  }
  showCloseAccount() {
    $('#withdraw').addClass('btn-disabled');
    $('#account-close').removeClass('btn-disabled');
  }
  // 发送短信打开销户弹窗
  @bindEvent('#account-close')
  async accountClose() {
    try {
      const res = await service.sendCode();
      if (res.code === SUCCESS_CODE) {
        $('#phoneNo').text(res.content);
        $('#dialog').show();
        this.countdown();
        $('#messageCode').val('');
      } else {
        toast(res.message);
      }
    } catch (error) {}
  }
  // 短信倒计时
  countdown() {
    if (timer === null) {
      $('#countdown').text(num + 's');
      timer = setInterval(() => {
        if (num <= 1) {
          num = ONE_MINUTE;
          $('#countdown').text('重新获取');
          clearInterval(timer);
          timer = null;
        } else {
          num--;
          $('#countdown').text(num + 's');
        }
      }, 1000);
    }
  }
  // 销户请求
  @bindEvent('#submit')
  async submit() {
    const messageCode = $('#messageCode').val();
    if (!messageCode) {
      toast('请输入验证码');
      return;
    }
    const loading = $.btnLoading('#submit', '销户中...');
    try {
      const res = await service.closeAccount({ messageCode });
      if (res.code === SUCCESS_CODE) {
        $('#dialog').hide();
        showSuccess();
      } else {
        toast(res.message);
      }
    } catch (error) {}
    loading.hide();
  }
}

function __init__() {
  const params = $.getUrlParams();
  if (params && params.protocolAcNo) {
    service = new Api(encodeURIComponent(params.protocolAcNo), params.cId);
    const app = new App();
    app.init();
  } else {
    showError();
  }
}

__init__();
