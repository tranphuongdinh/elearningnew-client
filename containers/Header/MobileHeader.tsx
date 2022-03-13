import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import {
    HeaderBrand,
    NavLink,
    PageInfo,
    SearchBar,
    UserInfo,
} from "./Header.style";
import {
    MobileHeaderContainer,
    MobileHeaderWrapper,
    ToggleMenu,
    MobileMenu,
    AuthInfo,
    CloseMenu,
    BrandIcon,
} from "./MobileHeader.style";
import {
    DANG_KI,
    DANG_NHAP,
    DANH_MUC_KHOA_HOC,
    KHOA_HOC,
    THONG_TIN_TAI_KHOAN,
    TIM_KIEM_KHOA_HOC,
} from "../../constants/navigation";
import { AuthContext } from "../../context/auth/auth.context";
import { getCoursesClient } from "../../apis/getCoursesClient";
import Dropdown from "react-dropdown";

type HeaderProps = {
    user: any;
};

const MobileHeader: React.FC<HeaderProps> = ({ user }) => {
    const router = useRouter();
    const { authDispatch } = useContext<any>(AuthContext);
    const [toggleMenu, setToggleMenu] = useState(false);
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
            console.log(res);
            const options = res.map((item: any) => {
                return {
                    value: item.maDanhMuc,
                    label: item.tenDanhMuc,
                };
            });
            setCategoryOptions(options);
        }
    };

    useEffect(() => {
        getCategories();
    }, []);

    return (
        <MobileHeaderWrapper>
            <MobileHeaderContainer>
                <PageInfo>
                    <HeaderBrand>
                        <Link href="/">
                            <img src="./images/logo.png" alt="Cybersoft" />
                        </Link>
                    </HeaderBrand>

                    <SearchBar>
                        <input
                            type="text"
                            placeholder="Tìm kiếm khóa học"
                            onKeyUp={(e) => {
                                e.key === "Enter" && handleSearch();
                            }}
                            onChange={(e) => {
                                setSearchValue(e.target.value);
                            }}
                            value={searchValue}
                        ></input>
                        <button onClick={handleSearch}>
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </button>
                    </SearchBar>
                </PageInfo>

                <ToggleMenu onClick={() => setToggleMenu(true)}>
                    <i className="fa-solid fa-bars"></i>
                </ToggleMenu>
            </MobileHeaderContainer>

            <MobileMenu className={`${toggleMenu && "active"}`}>
                <SearchBar>
                    <input
                        type="text"
                        placeholder="Tìm kiếm khóa học"
                        onKeyUp={(e) => {
                            e.key === "Enter" && handleSearch();
                        }}
                        onChange={(e) => {
                            setSearchValue(e.target.value);
                        }}
                        value={searchValue}
                    ></input>
                    <button onClick={handleSearch}>
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </button>
                </SearchBar>
                <AuthInfo>
                    {!user ? (
                        <NavLink>
                            <ul>
                                <Link href={DANG_KI}>
                                    <li>Đăng kí</li>
                                </Link>
                                <Link href={DANG_NHAP}>
                                    <li>Đăng nhập</li>
                                </Link>
                            </ul>
                        </NavLink>
                    ) : (
                        <UserInfo>
                            <p>
                                <i className="fa-solid fa-circle-user"></i>
                                Xin chào,{" "}
                                <a href={THONG_TIN_TAI_KHOAN}>{user.hoTen}</a>
                            </p>
                        </UserInfo>
                    )}
                </AuthInfo>
                <NavLink>
                    <ul>
                        <li>
                            <Dropdown
                                options={categoryOptions}
                                onChange={onSelect}
                                placeholder="Danh mục khóa học"
                                arrowClosed={
                                    <i className="fa-solid fa-bars"></i>
                                }
                                arrowOpen={
                                    <i className="fa-solid fa-bars-staggered"></i>
                                }
                            />
                        </li>
                        <Link href="/">
                            <li
                                className={
                                    router.pathname === "/" ? "active" : ""
                                }
                            >
                                Trang chủ
                            </li>
                        </Link>

                        {user && (
                            <a href={THONG_TIN_TAI_KHOAN}>
                                <li
                                    className={
                                        router.pathname === THONG_TIN_TAI_KHOAN
                                            ? "active"
                                            : ""
                                    }
                                >
                                    Tài khoản
                                </li>
                            </a>
                        )}
                        <Link href={KHOA_HOC}>
                            <li
                                className={
                                    router.pathname === KHOA_HOC ? "active" : ""
                                }
                            >
                                Khóa học
                            </li>
                        </Link>
                        <li onClick={logout}>Đăng xuất</li>
                    </ul>
                </NavLink>

                <CloseMenu>
                    <i
                        className="fa-solid fa-times"
                        onClick={() => setToggleMenu(false)}
                    ></i>
                </CloseMenu>

                <BrandIcon>
                    <Link href="/">
                        <img src="/images/icon.png" alt="Cybersoft" />
                    </Link>
                </BrandIcon>
            </MobileMenu>
        </MobileHeaderWrapper>
    );
};

export default MobileHeader;
