global.Buffer = require('buffer').Buffer;

import { Href } from "expo-router";

export const BASE_URL = "https://www.crunchiesonline.com/";
//export const BASE_URL = "https://crunchies-sandbox-delta.vercel.app/";

export const webviewLinkTo = (endpoint?: string): Href<string> => {
  //let endpoint = "menu?cat=" + encodeURIComponent(category || '');
  let linkparam = encodeToHex(BASE_URL + endpoint);

  if (endpoint?.startsWith(BASE_URL)) {
    linkparam = encodeToHex(endpoint);
  }
  let link = ("/webview?linkparam=" + linkparam) as Href<string>;
  //console.log(link);

  return link;
};

export const decodeLinkparam = (linkparam: string) => {
  let decodedlink = decodeFromHex(linkparam);
  console.log(decodedlink);
  return decodedlink;
};

function encodeToHex(arg0: string) {
    return Buffer.from(arg0).toString('hex');
}
function decodeFromHex(linkparam: string) {
    return Buffer.from(linkparam, 'hex').toString();
}

