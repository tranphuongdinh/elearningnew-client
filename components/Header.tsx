import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";

type HeaderProps = {
	user: any;
};

const Header: React.FC<HeaderProps> = ({user}) => {
    const router = useRouter();
    const logout = () => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("userInfo");
        router.push("/");
				router.reload();
    };

		console.log(user)

    return (
        <div className="header">
            <h1>This is header</h1>

            {!user ? (
                <div>
                    <button>
                        <Link href="/dangki">
                            <a>Đăng kí</a>
                        </Link>
                    </button>
                    <button>
                        <Link href="/dangnhap">
                            <a>Đăng nhập</a>
                        </Link>
                    </button>
                </div>
            ) : (
                <div>
                    <div>xin chào {user.hoTen}</div>
                    <button onClick={logout}>Đăng xuất</button>
                </div>
            )}
        </div>
    );
};

export default Header;
