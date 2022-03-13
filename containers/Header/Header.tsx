import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import {
    Button,
    HeaderBrand,
    HeaderContainer,
    HeaderWrapper,
    NavLink,
    PageInfo,
    PageNav,
    SearchBar,
    UserInfo,
    UserMenu,
} from "./Header.style";

import {
    DANG_KI,
    DANG_NHAP,
    DANH_MUC_KHOA_HOC,
    KHOA_HOC,
    THONG_TIN_TAI_KHOAN,
    TIM_KIEM_KHOA_HOC,
} from "../../constants/navigation";
import { AuthContext } from "../../context/auth/auth.context";
import Dropdown from "react-dropdown";
import { getCoursesClient } from "../../apis/getCoursesClient";

type HeaderProps = {
    user: any;
};

const Header: React.FC<HeaderProps> = ({ user }) => {
    const { authDispatch } = useContext<any>(AuthContext);
    const [toggleUserMenu, setToggleUserMenu] = useState(false);
    const router = useRouter();

    const [searchValue, setSearchValue] = useState(
        router?.query?.tenKhoaHoc || ""
    );

    const [categoryOptions, setCategoryOptions] = useState([]);

    const logout = () => {
        authDispatch({
            type: "LOGOUT",
        });
        window.location.replace("/");
    };

    const handleSearch = () => {
        router.push({
            pathname: TIM_KIEM_KHOA_HOC,
            query: {
                tenKhoaHoc: searchValue,
            },
        });
    };

    const onSelect = (option: any) => {
        if (option.value) {
            router.push({
                pathname: DANH_MUC_KHOA_HOC,
                query: {
                    maDanhMuc: option.value,
                },
            });
        } else {
            router.push(KHOA_HOC);
        }
    };

    const getCategories = async () => {
        const res = await getCoursesClient().getCategory();
        if (res?.length) {
            const options = res.map((item: any) => {
                return {
                    value: item.maDanhMuc,
                    label: item.tenDanhMuc,
                };
            });
            options.unshift({
                value: "",
                label: "Tất cả khóa học",
            });
            setCategoryOptions(options);
        }
    };

    useEffect(() => {
        getCategories();
    }, []);

    return (
        <HeaderWrapper id="header">
            <HeaderContainer>
                <PageInfo>
                    <HeaderBrand>
                        <Link href="/">
                            <img src="./images/logo.png" alt="Cybersoft" />
                        </Link>
                    </HeaderBrand>
                    <Dropdown
                        options={categoryOptions}
                        onChange={onSelect}
                        placeholder="Danh mục khóa học"
                        arrowClosed={<i className="fa-solid fa-bars"></i>}
                        arrowOpen={
                            <i className="fa-solid fa-bars-staggered"></i>
                        }
                    />
                    <SearchBar>
                        <input
                            type="text"
                            placeholder="Tìm kiếm khóa học"
                            onKeyUp={(e) => {
                                e.key === "Enter" && handleSearch();
                            }}
                            onChange={(e) => setSearchValue(e.target.value)}
                            value={searchValue}
                        ></input>
                        <button onClick={handleSearch}>
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </button>
                    </SearchBar>
                </PageInfo>

                <PageNav>
                    <NavLink>
                        <ul>
                            <Link href="/">
                                <li
                                    className={
                                        router.pathname === "/" ? "active" : ""
                                    }
                                >
                                    Trang chủ
                                </li>
                            </Link>
                            <Link href={KHOA_HOC}>
                                <li
                                    className={
                                        router.pathname === KHOA_HOC
                                            ? "active"
                                            : ""
                                    }
                                >
                                    Khóa học
                                </li>
                            </Link>
                        </ul>
                    </NavLink>

                    {!user ? (
                        <UserInfo>
                            <Link href={DANG_NHAP}>
                                <Button className="no-outline">
                                    Đăng nhập
                                </Button>
                            </Link>
                            <Link href={DANG_KI}>
                                <Button>Đăng kí</Button>
                            </Link>
                        </UserInfo>
                    ) : (
                        <UserInfo>
                            {toggleUserMenu && (
                                <UserMenu>
                                    <a href={THONG_TIN_TAI_KHOAN}>
                                        <li>
                                            <i className="fa-solid fa-user-large"></i>
                                            Tài khoản
                                        </li>
                                    </a>
                                    <li onClick={logout}>
                                        <i className="fa-solid fa-arrow-right-from-bracket"></i>
                                        Đăng xuất
                                    </li>
                                </UserMenu>
                            )}
                            <i
                                className={`fa-solid fa-circle-user ${
                                    toggleUserMenu && "active"
                                }`}
                                onClick={() => {
                                    setToggleUserMenu(!toggleUserMenu);
                                }}
                            ></i>
                            <p>
                                Xin chào,{" "}
                                <a
                                    href={THONG_TIN_TAI_KHOAN}
                                    className="username"
                                >
                                    {user.hoTen || "Unnamed"}
                                </a>
                            </p>
                        </UserInfo>
                    )}
                </PageNav>
            </HeaderContainer>
        </HeaderWrapper>
    );
};

export default Header;
