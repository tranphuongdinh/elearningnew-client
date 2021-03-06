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
						...userDetail,
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
                toast.success("C???p nh???t th??ng tin th??nh c??ng!");
                await getUser();
                setIsUpdate(false);
            } else {
                toast.error(
                    res?.response?.data || "C???p nh???t th??ng tin th???t b???i!"
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
            toast.error("M???t kh???u hi???n t???i kh??ng ????ng!");
            return;
        } else {
            const res = await getUserClient().updateUser(data);
            if (res.taiKhoan) {
                toast.success("?????i m???t kh???u th??nh c??ng!");
                setIsChangePassword(false);
            } else {
                toast.error(res?.response?.data || "?????i m???t kh???u th???t b???i!");
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
                <title>Th??ng tin t??i kho???n | Cybersoft Elearning</title>
            </Head>
            <MainSection>
                {isAuthenticated && (
                    <UserProfileContainer>
                        {userDetail && (
                            <>
                                <ProfileInfo>
                                    <h2>Th??ng tin t??i kho???n</h2>
                                    <form onSubmit={handleSubmit}>
                                        <ProfileDetail>
                                            <ProfileInputGroup>
                                                <span>T??i kho???n</span>
                                                <input
                                                    required
                                                    type="text"
                                                    defaultValue={account}
                                                    className="disabled"
                                                />
                                            </ProfileInputGroup>
                                            <ProfileInputGroup>
                                                <span>T??n ng?????i d??ng</span>
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
                                                    title="T??n ng?????i d??ng ph???i c?? ??t nh???t 6 k?? t???"
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
                                                    title="Vui l??ng nh???p email h???p l???"
                                                />
                                            </ProfileInputGroup>
                                            <ProfileInputGroup>
                                                <span>S??? ??i???n tho???i</span>
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
                                                    title="S??? ??i???n tho???i ch??? bao g???m ch??? s???"
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
                                                    ?????i m???t kh???u
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
                                                    L??u
                                                </Button>
                                                <Button
                                                    className="no-outline"
                                                    onClick={() => {
                                                        setIsUpdate(false);
                                                        resetValue();
                                                    }}
                                                >
                                                    H???y
                                                </Button>
                                            </ButtonGroup>
                                        ) : (
                                            <Button
                                                onClick={() => {
                                                    setIsUpdate(true);
                                                }}
                                            >
                                                C???p nh???t
                                            </Button>
                                        )}
                                    </form>
                                </ProfileInfo>

                                <ProfileInfo>
                                    <ProfileInfoHeader>
                                        <h2>C??c kh??a h???c ???? ????ng k??</h2>
                                        <Filter>
                                            <input
                                                type="text"
                                                placeholder="T??m ki???m kh??a h???c"
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
                                                B???n ch??a ????ng k?? kh??a h???c n??o.{" "}
                                                <Link href={KHOA_HOC}>
                                                    <span
                                                        style={{
                                                            fontWeight: "600",
                                                            cursor: "pointer",
                                                        }}
                                                    >
                                                        ????ng k?? ngay
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
                            <span>M???t kh???u hi???n t???i</span>
                            <input
                                required
                                type="password"
                                value={currentPassword}
                                onChange={(e) =>
                                    setCurrentPassword(e.target.value)
                                }
                                // pattern="^[0-9]*$"
                                // title="S??? ??i???n tho???i ch??? bao g???m ch??? s???"
                            />
                        </ProfileInputGroup>

                        <ProfileInputGroup>
                            <span>M???t kh???u m???i</span>
                            <input
                                required
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                        </ProfileInputGroup>

                        <ProfileInputGroup>
                            <span>X??c nh???n m???t kh???u m???i</span>
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
                                M???t kh???u m???i c?? ????? d??i ??t nh???t 6 k?? t???
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
                                M???t kh???u m???i bao g???m ch??? th?????ng, ch??? in hoa, ch???
                                s??? v?? k?? t??? ?????c bi???t
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
                                X??c nh???n m???t kh???u m???i tr??ng kh???p
                            </ValidatorError>
                        </div>

                        <Button
                            type="submit"
                            className={!isValidPassword() ? "" : "disabled"}
                        >
                            L??u
                        </Button>
                        <Button
                            onClick={() => {
                                setIsChangePassword(false);
                            }}
                            className="no-outline"
                            style={{ marginLeft: "10px" }}
                        >
                            H???y
                        </Button>
                    </form>
                </ChangePasswordWrapper>
            )}
        </div>
    );
};

export default ThongTinTaiKhoan;
