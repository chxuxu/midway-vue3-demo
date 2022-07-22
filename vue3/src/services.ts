import { request, IServerBack } from "./utils";

export const login = function (params: any = {
  username: "", password: ""
}): Promise<IServerBack<any>> {
  return request(params, {
    url: "http://127.0.0.1:6001/api/login",
  }
  );
}