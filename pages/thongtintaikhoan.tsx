import React from "react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getUserClient } from "../apis/getUserClient";
import { NextPage } from "next";

const ThongTinTaiKhoan: NextPage = () => {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const { tab } = router.query;

    if (router.isFallback) {
        return <div>Loading...</div>;
    }

    useEffect(() => {
        const getUser = async () => {
            const res = await getUserClient().getUserInfo();
            if (res.data) {
							setUser(res.data);
						}
        };
        getUser();
    }, []);

    return (
        <div>
            <h1>Thong tin tai khoan</h1>
            {user && JSON.stringify(user)}
        </div>
    );
};

export default ThongTinTaiKhoan;
