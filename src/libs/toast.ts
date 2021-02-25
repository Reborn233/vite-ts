import $ from './utils';
const tpl = `
<div>
  <div class="mask_transparent"></div>
  <div class="toast toast-text">
    <p class="toast-content"><%=content%></p>
  </div>
</div>

`;
let _sington: ChildNode | Boolean;

function toast(content = '文字提示', ms = 1000) {
  if (_sington) return _sington;
  const $toastWrap = $.parseElement(
    $.render(tpl, {
      content,
    }),
  );
  const $body = document.body;
  $body.appendChild($toastWrap);

  setTimeout(() => {
    $body.removeChild($toastWrap);
    _sington = false;
  }, ms);

  _sington = $toastWrap;
  return $toastWrap;
}
export default toast;
