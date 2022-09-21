import { request, IServerBack } from "./utils";

export const login = function (params: any = {
  username: "", password: ""
}): Promise<IServerBack<any>> {
  return request(params, {
    url: "http://127.0.0.1:6001/api/login",
  }
  );
}

export const insertStaff = function (params: any = {
  
}): Promise<IServerBack<any>> {
  return request(params, {
    method:"POST",
    url: "http://127.0.0.1:6001/api/staff/insert",
  }
  );
}

export const deleteStaff = function (params: any = {
  
}): Promise<IServerBack<any>> {
  return request(params, {
    url: "http://127.0.0.1:6001/api/staff/delete",
  }
  );
}

export const findStaff = function (params: any = {
  
}): Promise<IServerBack<any>> {
  return request(params, {
    url: "http://127.0.0.1:6001/api/staff/list",
  }
  );
}