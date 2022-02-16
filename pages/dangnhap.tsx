import React, { useEffect } from "react";
import { getAuthClient } from "../apis/getAuthClient";
import { useRouter } from "next/router";
import { NextPage } from "next";

const DangNhap: NextPage = () => {
    const [taiKhoan, setTaiKhoan] = React.useState("");
    const [matKhau, setMatKhau] = React.useState("");
    const router = useRouter();
		
    const handleSubmit = async () => {
        const data = {
            taiKhoan: taiKhoan,
            matKhau: matKhau,
        };

        const res = await getAuthClient().login(data);
        if (res.data) {
            localStorage.setItem("userInfo", JSON.stringify(res.data));
            localStorage.setItem("access_token", res.data.accessToken);
            router.replace("/");
        } else {
            alert("Đăng nhập thất bại");
        }
    };

		useEffect(() => {
			if (localStorage.getItem("userInfo")) {
				router.replace("/");
			}
		})

    return (
        <div>
            <h1>Đăng nhập</h1>
            <input
                type="text"
                value={taiKhoan}
                onChange={(e) => setTaiKhoan(e.target.value)}
            />
            <input
                type="password"
                value={matKhau}
                onChange={(e) => setMatKhau(e.target.value)}
            />
            <button onClick={handleSubmit}>Đăng nhập</button>
        </div>
    );
}

export default DangNhap;