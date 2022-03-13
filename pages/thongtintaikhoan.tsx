import React, { useContext } from "react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getUserClient } from "../apis/getUserClient";
import { NextPage } from "next";
import Head from "next/head";
import { UserVM } from "../models/models";
import { MainSection } from "../components/Commons/Commons.style";
import {
    ChangePasswordWrapper,
    Filter,
    ProfileDetail,
    ProfileInfo,
    ProfileInfoHeader,
    ProfileInputGroup,
    UserProfileContainer,
} from "../containers/UserProfile/UserProfile.style";
import { Button } from "../containers/Header/Header.style";
import { ButtonGroup } from "../containers/Banner/Banner.style";
import { MIN_LENGTH, PASSWORD } from "../constants/validation";
import ProfileCourse from "../components/ProfileCourse/ProfileCourse";
import { AuthContext } from "../context/auth/auth.context";
import { toast } from "react-toastify";
import { ValidatorError } from "../containers/Auth/Auth.style";
import { CoursesGrid } from "../containers/CoursesList/CoursesList.style";
import { KHOA_HOC } from "../constants/navigation";
import Link from "next/link";

const ThongTinTaiKhoan: NextPage = () => {
    const {
        authState: { isAuthenticated },
        authDispatch,
    } = useContext<any>(AuthContext);

    const router = useRouter();
    const [userDetail, setUserDetail] = useState<UserVM>({} as UserVM);
    const [isUpdate, setIsUpdate] = useState(false);
    const [isChangePassword, setIsChangePassword] = useState(false);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [account, setAccount] = useState("");

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");

    const [searchValue, setSearchValue] = useState("");

    const handleSearch = () => {};

    const checkRegex = (value: string, regex: RegExp) => {
        if (!value) return false;
        return regex.test(value);
    };

    const resetValue = () => {
        setName(userDetail?.hoTen || "");
        setEmail(userDetail?.email);
        setPhone(userDetail?.soDT || "");
    };

    const isChange = () => {
        const data: UserVM = {
            ...userDetail,
            hoTen: name,
            email,
            soDT: phone,
            maLoaiNguoiDung: "HV",
            maNhom: userDetail.maNhom,
        };

        return JSON.stringify(data) !== JSON.stringify(userDetail);
    };

    const isValidPassword = () => {
        return (
            currentPassword &&
            checkRegex(newPassword, MIN_LENGTH) &&
            checkRegex(newPassword, PASSWORD) &&
            newPassword !== confirmNewPassword
        );
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = {
            hoTen: name,
            email,
            soDT: phone,
            maLoaiNguoiDung: "HV",
            maNhom: userDetail.maNhom,
            taiKhoan: account,
        };

        if (MIN_LENGTH.test(name)) {
            const res = await getUserClient().updateUser(data);

            if (res.taiKhoan) {
                toast.success("Cập nhật thông tin thành công!");
                await getUser();
                setIsUpdate(false);
            } else {
                toast.error(
                    res?.response?.data || "Cập nhật thông tin thất bại!"
                );
            }
        }
    };

    const handleChangePassword = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();
        const data = {
            ...userDetail,
            matKhau: newPassword,
        };

        const { matKhau } = await getUserClient().getAccountInfo();

        if (currentPassword !== matKhau) {
            toast.error("Mật khẩu hiện tại không đúng!");
            return;
        } else {
            const res = await getUserClient().updateUser(data);
            if (res.taiKhoan) {
                toast.success("Đổi mật khẩu thành công!");
                setIsChangePassword(false);
            } else {
                toast.error(res?.response?.data || "Đổi mật khẩu thất bại!");
            }
        }
    };

    const getUser = async () => {
        const userInfo = await getUserClient().getUserInfo();
        if (userInfo && isAuthenticated) {
            setUserDetail(userInfo);
            setName(userInfo.hoTen);
            setEmail(userInfo.email);
            setPhone(userInfo.soDT);
            setAccount(userInfo.taiKhoan);
            authDispatch({
                type: "UPDATE_USER",
                payload: userInfo,
            });
        } else {
            router.replace("/");
        }
    };

    useEffect(() => {
        getUser();
    }, []);

    return (
        <div>
            <Head>
                <title>Thông tin tài khoản | Elearning</title>
            </Head>
            <MainSection>
                {isAuthenticated && (
                    <UserProfileContainer>
                        {userDetail && (
                            <>
                                <ProfileInfo>
                                    <h2>Thông tin tài khoản</h2>
                                    <form onSubmit={handleSubmit}>
                                        <ProfileDetail>
                                            <ProfileInputGroup>
                                                <span>Tài khoản</span>
                                                <input
                                                    required
                                                    type="text"
                                                    defaultValue={account}
                                                    className="disabled"
                                                />
                                            </ProfileInputGroup>
                                            <ProfileInputGroup>
                                                <span>Tên người dùng</span>
                                                <input
                                                    required
                                                    type="text"
                                                    value={name}
                                                    onChange={(e) =>
                                                        setName(e.target.value)
                                                    }
                                                    className={
                                                        isUpdate
                                                            ? ""
                                                            : "disabled"
                                                    }
                                                    pattern=".{6,}"
                                                    title="Tên người dùng phải có ít nhất 6 kí tự"
                                                />
                                            </ProfileInputGroup>
                                            <ProfileInputGroup>
                                                <span>Email</span>
                                                <input
                                                    required
                                                    type="email"
                                                    value={email}
                                                    onChange={(e) =>
                                                        setEmail(e.target.value)
                                                    }
                                                    className={
                                                        isUpdate
                                                            ? ""
                                                            : "disabled"
                                                    }
                                                    title="Vui lòng nhập email hợp lệ"
                                                />
                                            </ProfileInputGroup>
                                            <ProfileInputGroup>
                                                <span>Số điện thoại</span>
                                                <input
                                                    required
                                                    type="tel"
                                                    value={phone}
                                                    onChange={(e) =>
                                                        setPhone(e.target.value)
                                                    }
                                                    className={
                                                        isUpdate
                                                            ? ""
                                                            : "disabled"
                                                    }
                                                    pattern="^[0-9]*$"
                                                    title="Số điện thoại chỉ bao gồm chữ số"
                                                />
                                            </ProfileInputGroup>

                                            <ProfileInputGroup>
                                                <span
                                                    className="changePasswordTitle"
                                                    onClick={() => {
                                                        setIsChangePassword(
                                                            true
                                                        );
                                                    }}
                                                >
                                                    Đổi mật khẩu
                                                </span>
                                            </ProfileInputGroup>
                                        </ProfileDetail>
                                        {isUpdate ? (
                                            <ButtonGroup>
                                                <Button
                                                    type="submit"
                                                    className={
                                                        isChange()
                                                            ? ""
                                                            : "disabled"
                                                    }
                                                >
                                                    Lưu
                                                </Button>
                                                <Button
                                                    className="no-outline"
                                                    onClick={() => {
                                                        setIsUpdate(false);
                                                        resetValue();
                                                    }}
                                                >
                                                    Hủy
                                                </Button>
                                            </ButtonGroup>
                                        ) : (
                                            <Button
                                                onClick={() => {
                                                    setIsUpdate(true);
                                                }}
                                            >
                                                Cập nhật
                                            </Button>
                                        )}
                                    </form>
                                </ProfileInfo>

                                <ProfileInfo>
                                    <ProfileInfoHeader>
                                        <h2>Các khóa học đã đăng kí</h2>
                                        <Filter>
                                            <input
                                                type="text"
                                                placeholder="Tìm kiếm khóa học"
                                                onKeyUp={(e) => {
                                                    e.key === "Enter" &&
                                                        handleSearch();
                                                }}
                                                onChange={(e) =>
                                                    setSearchValue(
                                                        e.target.value
                                                    )
                                                }
                                                value={searchValue}
                                            ></input>
                                            <i className="fa-solid fa-magnifying-glass"></i>
                                        </Filter>
                                    </ProfileInfoHeader>
                                    <CoursesGrid className="expand">
                                        {userDetail?.chiTietKhoaHocGhiDanh?.map(
                                            (course: any) => {
                                                if (
                                                    course.tenKhoaHoc
                                                        .toLowerCase()
                                                        .includes(
                                                            searchValue.toLowerCase()
                                                        )
                                                ) {
                                                    return (
                                                        <ProfileCourse
                                                            key={
                                                                course.maKhoaHoc
                                                            }
                                                            course={course}
                                                            taiKhoan={
                                                                userDetail?.taiKhoan
                                                            }
                                                            updateUser={async () => {
                                                                await getUser();
                                                            }}
                                                        ></ProfileCourse>
                                                    );
                                                }
                                            }
                                        )}

                                        {userDetail?.chiTietKhoaHocGhiDanh
                                            ?.length === 0 && (
                                            <p>
                                                Bạn chưa đăng kí khóa học nào.{" "}
                                                <Link href={KHOA_HOC}>
                                                    <span
                                                        style={{
                                                            fontWeight: "600",
                                                            cursor: "pointer",
                                                        }}
                                                    >
                                                        Đăng kí ngay
                                                    </span>
                                                </Link>
                                            </p>
                                        )}
                                    </CoursesGrid>
                                </ProfileInfo>
                            </>
                        )}
                    </UserProfileContainer>
                )}
            </MainSection>

            {isChangePassword && (
                <ChangePasswordWrapper>
                    <form onSubmit={handleChangePassword}>
                        <ProfileInputGroup>
                            <span>Mật khẩu hiện tại</span>
                            <input
                                required
                                type="password"
                                value={currentPassword}
                                onChange={(e) =>
                                    setCurrentPassword(e.target.value)
                                }
                                // pattern="^[0-9]*$"
                                // title="Số điện thoại chỉ bao gồm chữ số"
                            />
                        </ProfileInputGroup>

                        <ProfileInputGroup>
                            <span>Mật khẩu mới</span>
                            <input
                                required
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                        </ProfileInputGroup>

                        <ProfileInputGroup>
                            <span>Xác nhận mật khẩu mới</span>
                            <input
                                required
                                type="password"
                                value={confirmNewPassword}
                                onChange={(e) =>
                                    setConfirmNewPassword(e.target.value)
                                }
                            />
                        </ProfileInputGroup>

                        <div style={{ marginBottom: "30px" }}>
                            <ValidatorError
                                className={`${
                                    !checkRegex(newPassword, MIN_LENGTH) &&
                                    "error"
                                }`}
                            >
                                <i
                                    className={`${
                                        checkRegex(newPassword, MIN_LENGTH)
                                            ? "fa-solid fa-circle-check"
                                            : "fa-solid fa-circle-xmark"
                                    }`}
                                ></i>
                                Mật khẩu mới có độ dài ít nhất 6 kí tự
                            </ValidatorError>
                            <ValidatorError
                                className={`${
                                    !checkRegex(newPassword, PASSWORD) &&
                                    "error"
                                }`}
                            >
                                <i
                                    className={`${
                                        checkRegex(newPassword, PASSWORD)
                                            ? "fa-solid fa-circle-check"
                                            : "fa-solid fa-circle-xmark"
                                    }`}
                                ></i>
                                Mật khẩu mới bao gồm chữ thường, chữ in hoa, chữ
                                số và kí tự đặc biệt
                            </ValidatorError>
                            <ValidatorError
                                className={`${
                                    newPassword !== confirmNewPassword &&
                                    "error"
                                }`}
                            >
                                <i
                                    className={`${
                                        newPassword === confirmNewPassword
                                            ? "fa-solid fa-circle-check"
                                            : "fa-solid fa-circle-xmark"
                                    }`}
                                ></i>
                                Xác nhận mật khẩu mới trùng khớp
                            </ValidatorError>
                        </div>

                        <Button
                            type="submit"
                            className={!isValidPassword() ? "" : "disabled"}
                        >
                            Lưu
                        </Button>
                        <Button
                            onClick={() => {
                                setIsChangePassword(false);
                            }}
                            className="no-outline"
                            style={{ marginLeft: "10px" }}
                        >
                            Hủy
                        </Button>
                    </form>
                </ChangePasswordWrapper>
            )}
        </div>
    );
};

export default ThongTinTaiKhoan;
