const createCollection = (collection: any) => {
  collection.addClass = (className: string) => {
    collection.forEach((element: HTMLElement) => {
      element.classList.add(className);
    });
    return collection;
  };
  collection.removeClass = (className: string) => {
    collection.forEach((element: HTMLElement) => {
      element.classList.remove(className);
    });
    return collection;
  };
  collection.show = () => {
    collection.forEach((element: HTMLElement) => {
      element.style.display = '';
    });
    return collection;
  };
  collection.hide = () => {
    collection.forEach((element: HTMLElement) => {
      element.style.display = 'none';
    });
    return collection;
  };
  collection.val = (...args: string[]) => {
    if (args.length) {
      collection.forEach((element: HTMLInputElement) => {
        element.value = args[0];
      });
    } else {
      return collection[0].value;
    }
  };
  collection.html = (...args: string[]) => {
    if (args.length) {
      collection.forEach((element: HTMLElement) => {
        element.innerHTML = args[0];
      });
    } else {
      return collection[0].innerHTML;
    }
  };
  collection.text = (...args: Array<string | null>) => {
    if (args.length) {
      collection.forEach((element: HTMLElement) => {
        element.textContent = args[0];
      });
    } else {
      return collection[0].textContent;
    }
  };
  collection.data = (...args: string[]) => {
    if (args.length === 1) {
      const el = collection[0];
      return el.dataset[args[0]];
    } else if (args.length === 2) {
      collection.forEach((element: HTMLElement) => {
        element.setAttribute(`data-${args[0]}`, args[1]);
      });
    }
  };
  collection.remove = () => {
    const el = collection[0];
    el.parentNode.removeChild(el);
  };
  collection.append = (ele: HTMLElement) => {
    collection.forEach((element: HTMLElement) => {
      element.appendChild(ele);
    });
  };
  collection.on = (eventName: string, callback: Function) => {
    collection.forEach((element: any) => {
      element.addEventListener(eventName, callback);
    });
  };
  collection.off = (eventName: string, callback: Function) => {
    collection.forEach((element: any) => {
      element.removeEventListener(eventName, callback);
    });
  };
  return collection;
};
const $ = (...args: Array<any>) => {
  if (typeof args[0] === 'string') {
    const collection = document.querySelectorAll(args[0]);
    return createCollection(collection);
  } else if (args[0] instanceof HTMLElement) {
    const collection = [args[0]];
    return createCollection(collection);
  }
};
$.noop = () => {};
$.btnLoading = (id: string, text: string = '请稍等...') => {
  let _sington: any;
  const $btn = $(id);
  const textContent = $btn.text();
  $btn.addClass('btn-loading').text(text);
  let _hide = (text: string) => {
    _hide = $.noop;
    $btn.removeClass('btn-loading').text(text || textContent);
    _sington = false;
  };
  _sington = $btn[0];
  _sington.hide = _hide;
  return _sington;
};
$.getUrlParams = () => {
  let url = location.search; //获取url中"?"符后的字串
  let theRequest = new Object() as any;
  if (url.indexOf('?') !== -1) {
    let str = url.substr(1);
    let strs = str.split('&');
    for (let i = 0; i < strs.length; i++) {
      let index = strs[i].indexOf('=') + 1;
      let len = strs[i].length;
      theRequest[strs[i].split('=')[0]] = unescape(
        strs[i].substring(index, len),
      );
    }
  } else {
    return null;
  }
  return theRequest;
};
$.sum = function (a: string, b: string) {
  const aa = Number(a);
  const bb = Number(b);
  return '' + (aa + bb).toFixed(2);
};
$.parseElement = (htmlString: string) => {
  return new DOMParser().parseFromString(htmlString, 'text/html').body
    .childNodes[0];
};
$.render = (tpl: string, data: Object) => {
  const code =
    "var p=[];with(this){p.push('" +
    tpl
      .replace(/[\r\t\n]/g, ' ')
      .split('<%')
      .join('\t')
      .replace(/((^|%>)[^\t]*)'/g, '$1\r')
      .replace(/\t=(.*?)%>/g, "',$1,'")
      .split('\t')
      .join("');")
      .split('%>')
      .join("p.push('")
      .split('\r')
      .join("\\'") +
    "');}return p.join('');";
  return new Function(code).apply(data);
};
export default $;
