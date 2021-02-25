import $ from './utils';

const tpl = `
<div class="result-page">
  <p class="result-text"><%=content%></p>
</div>
`;

function showError(content: string = '【protocolAcNo】参数缺失') {
  const $errorWrap = $.render(tpl, {
    content,
  });
  $('#main').html($errorWrap);
}

export default showError;
