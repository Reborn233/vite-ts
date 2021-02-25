import $ from './utils';
const tpl = `
<div class="result-page">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="80"
    height="80"
    viewBox="0 0 80 80"
  >
    <defs>
      <style>
        .a {
          fill: #41cc8b;
        }
      </style>
    </defs>
    <path
      class="a"
      d="M40,80.256a40,40,0,1,1,40-40,40,40,0,0,1-40,40Zm-8.92-24.3a4.18,4.18,0,0,0,5.9,0L62.24,30.7a4.207,4.207,0,0,0-5.9-6l-22.5,22.24-10-10a4.207,4.207,0,1,0-6,5.9Z"
      transform="translate(0 -0.256)"
    />
  </svg>
  <p class="result-text">销户成功</p>
</div>
`;

function showSuccess() {
  $('#main').html(tpl);
}

export default showSuccess;
