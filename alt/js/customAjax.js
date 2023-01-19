window.dev_null = async function() { };
if (!XMLHttpRequest.prototype.nativeOpen) {
  XMLHttpRequest.prototype.nativeOpen = XMLHttpRequest.prototype.open;
}

XMLHttpRequest.prototype.customOpen = function(method, url, asynch, user, password) {

  this.method = method;
  this.requestURL = url;
  this.asynch = asynch;
  if (user) { this.user = user; }
  if (password) { this.password = password; }
  this.requestHeaders = new Map();

  return this.nativeOpen(method, url, asynch, user, password);

}

XMLHttpRequest.prototype.open = XMLHttpRequest.prototype.customOpen;

if (!XMLHttpRequest.prototype.nativeSend) {
  XMLHttpRequest.prototype.nativeSend = XMLHttpRequest.prototype.send;
}

XMLHttpRequest.prototype.customSend = function(body) {

  this.body = body;

  if ((this.requestURL.search('api.wsj.net') == -1) && (this.requestURL.search('wsjstream.wsj.net') == -1)) {
    return this.nativeSend(body);
  }
}


XMLHttpRequest.prototype.send = XMLHttpRequest.prototype.customSend;



if (!XMLHttpRequest.prototype.nativeSetRequestHeader) {
  XMLHttpRequest.prototype.nativeSetRequestHeader = XMLHttpRequest.prototype.setRequestHeader;
}

XMLHttpRequest.prototype.customSetRequestHeader = function(header, value) {


  try {

    this.nativeSetRequestHeader(header, value);

    if (this.requestHeaders.get(header)) {

      this.requestHeaders.set(header, this.requestHeaders.get(header) + ', ' + value);

    }
    else {
      this.requestHeaders.set(header, value);

    }


  } catch (e) {

    return e;

  }

  return;
}


XMLHttpRequest.prototype.setRequestHeader = XMLHttpRequest.prototype.customSetRequestHeader;

if (!window.Response.nativeRedirect) {
  window.Response.nativeRedirect = window.Response.redirect;
}

window.Response.customRedirect = function(url, status) {

  let red = this.nativeRedirect(url, status);
  red.redirectURL = url;
  if (status) { red.redirectStatus = status; }
  red.redirectFrom = this;
  return red;
}

window.Response.redirect = window.Response.customRedirect;


if (!window.Response.nativeClone) {
  window.Response.nativeClone = window.Response.clone;
}

window.Response.customClone = function() {

  let cln = this.nativeClone();

  cln.cloneFrom = this;
  return cln;
}

window.Response.clone = window.Response.customClone;


if (!window.Response.nativeError) {
  window.Response.nativeError = window.Response.error;
}

window.Response.customError = function() {

  let ero = this.nativeError();

  ero.errorFrom = this;
  return ero;
}

window.Response.error = window.Response.customError;

if (!window.Response.nativeText) {
  window.Response.nativeText = window.Response.text;
}

window.Response.customText = async function() {

  let txt = await this.nativeText();

  this.responseText = txt;
  return txt;
}

window.Response.text = window.Response.customText;



if (!window.Response.nativeJson) {
  window.Response.nativeJson = window.Response.json;
}

window.Response.customJson = async function() {

  let jsn = await this.nativeJson();

  this.responseJson = jsn;
  return jsn;
}

window.Response.json = window.Response.customJson;




if (!window.Response.nativeBlob) {
  window.Response.nativeBlob = window.Response.blob;
}

window.Response.customBlob = async function() {

  let blb = await this.nativeBlob();

  this.responseBlob = blb;
  return blb;
}

window.Response.blob = window.Response.customBlob;


if (!window.Response.nativeFormData) {
  window.Response.nativeFormData = window.Response.formData;
}

window.Response.customFormData = async function() {

  let dta = await this.nativeFormData();

  this.responseFormData = dta;
  return dta;
}

window.Response.formData = window.Response.customFormData;



if (!window.Response.nativeArrayBuffer) {
  window.Response.nativeArrayBuffer = window.Response.arrayBuffer;
}
window.Response.customArrayBuffer = async function() {

  let bfr = await this.nativeArrayBuffer();

  this.responseArrayBuffer = bfr;
  return bfr;
}

window.Response.arrayBuffer = window.Response.customArrayBuffer;



if (!window.Request.nativeClone) {
  window.Request.nativeClone = window.Request.clone;
}

window.Request.customClone = function() {

  let cln = this.nativeClone();

  cln.cloneFrom = this;
  return cln;
}

window.Request.clone = window.Request.customClone;


if (!window.Request.nativeText) {
  window.Request.nativeText = window.Request.text;
}

window.Request.customText = async function() {

  let txt = await this.nativeText();

  this.requestText = txt;
  return txt;
}

window.Request.text = window.Request.customText;



if (!window.Request.nativeJson) {
  window.Request.nativeJson = window.Request.json;
}

window.Request.customJson = async function() {

  let jsn = await this.nativeJson();

  this.requestJson = jsn;
  return jsn;
}

window.Request.json = window.Request.customJson;




if (!window.Request.nativeBlob) {
  window.Request.nativeBlob = window.Request.blob;
}

window.Request.customBlob = async function() {

  let blb = await this.nativeBlob();

  this.requestBlob = blb;
  return blb;
}

window.Request.blob = window.Request.customBlob;


if (!window.Request.nativeFormData) {
  window.Request.nativeFormData = window.Request.formData;
}
window.Request.customFormData = async function() {

  let dta = await this.nativeFormData();

  this.requestFormData = dta;
  return dta;
}

window.Request.formData = window.Request.customFormData;



if (!window.Request.nativeArrayBuffer) {
  window.Request.nativeArrayBuffer = window.Request.arrayBuffer;
}

window.Request.customArrayBuffer = async function() {

  let bfr = await this.nativeArrayBuffer();

  this.requestArrayBuffer = bfr;
  return bfr;
}

window.Request.arrayBuffer = window.Request.customArrayBuffer;

if (!window.nativeFetch) {
  window.nativeFetch = window.fetch;
}
window.customFetch = async function(request, headers) {

  var req;
  var response;

  if (typeof request == 'string') {
    if (request.search('api.wsj.net') > -1) { return dev_null; }
    if (request.search('wsjstream.wsj.net') > -1) { return dev_null; }
    req = new Request(request, headers);
    response = await window.nativeFetch(req);

  } else {
    if (request.url.search('api.wsj.net') > -1) { return dev_null; }
    if (request.url.search('wsjstream.wsj.net') > -1) { return dev_null; }

    response = await window.nativeFetch(request, headers);
  }
  if (typeof request == 'object') {

    response.requestInputObject = request;

  } else {

    response.requestInputURL = request;
    response.requestInputObject = req;

  }

  if (headers) { response.requestInputHeaders = headers; }

  return response;
}

window.fetch = window.customFetch;

