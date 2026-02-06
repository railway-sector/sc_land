const c=(t,o=100)=>{let e;return(...r)=>{const u=()=>{clearTimeout(e),t(...r)};clearTimeout(e),e=setTimeout(u,o)}};export{c as d};
