import axios from "./index";
import {USER_URI } from "../constants/api";

class UserClient {
		getUserInfo() {
				return axios
						.post(
								`${USER_URI}/ThongTinNguoiDung`,
						)
						.then((response) => {
								return response;
						})
						.catch((error) => {
								return error;
						});
		}
}

export function getUserClient() {
    return new UserClient();
}
