

export interface IServerBack<T> {
  code: number;
  message?: string;
  result?: Array<T> | T | { data: IServerBack<T>, total?: number } | null;
}
export const object2params = function (obj: any) {
  let arr = [];
  for (let key in obj) {
    arr.push(key + "=" + encodeURIComponent(obj[key]));
  }
  return arr.join("&");
}

export const request = function (data: any, options: any = {
  url: "",
  method: "GET", // *GET, POST, PUT, DELETE, etc.
  mode: "cors", // no-cors, *cors, same-origin
  //cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
  //credentials: "same-origin", // include, *same-origin, omit
  // headers: {
  //   "Content-Type": "application/json",
  //   // 'Content-Type': 'application/x-www-form-urlencoded',
  // },
  //redirect: "follow", // manual, *follow, error
  //referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
  //body: JSON.stringify(data) // body data type must match "Content-Type" header
}) {
  console.log(data);
  let url = options.url;
  let _options: any = {
    ...{method: "GET", mode: "cors"},...options
  };
  if (_options.method?.toLocaleLowerCase() == "get") {
    if (url.indexOf("?") < 0) {
      url += "?"
    }
    url += object2params(data);
  } console.log(url);
  if (options.method?.toLocaleLowerCase() == "post") {
    _options.body = JSON.stringify(data);
    if(!_options.headers){
      _options.headers = { "Content-Type": "application/json" };
    }
    
  }
  return new Promise<IServerBack<any>>(function (resolve, reject) {
    fetch(
      url,
      { ..._options, ...options }
    ).then(async (response: any) => {
      let json=await response.json();
      if (response.status == 200) {
        resolve(json);
      } else {
        resolve({
          code: 400, result: null, message: response.statusText
        });
      }
    }, res => {
      resolve({
        code: 400, result: null, message: res.statusText
      });
    });
  });

}