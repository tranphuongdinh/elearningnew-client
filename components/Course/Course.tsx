import React, { useContext, useEffect } from "react";
import Link from "next/link";
import { CourseProps } from "../../models/models";
import {
    CourseCategory,
    CourseContainer,
    CourseWrapper,
    ImageWrapper,
    InfoWrapper,
} from "./Course.style";

import {
    DANG_NHAP,
    DANH_MUC_KHOA_HOC,
    KHOA_HOC,
} from "../../constants/navigation";
import { Button } from "../../containers/Header/Header.style";
import { AuthContext } from "../../context/auth/auth.context";
import { getCoursesClient } from "../../apis/getCoursesClient";
import { toast } from "react-toastify";
import { getUserClient } from "../../apis/getUserClient";
import { useRouter } from "next/router";

const Course: React.FC<CourseProps> = ({ course }) => {
    const {
        authState: { isAuthenticated, user },
    } = useContext<any>(AuthContext);
    const router = useRouter();

    const [registeredCourses, setRegisteredCourses] = React.useState<any>({});

    const getRegisteredCourses = async () => {
        const { chiTietKhoaHocGhiDanh } = await getUserClient().getUserInfo();

        const registeredCourses = {} as any;
        chiTietKhoaHocGhiDanh?.forEach(
            (course: { maKhoaHoc: string | number }) => {
                registeredCourses[course.maKhoaHoc] = course;
            }
        );

        setRegisteredCourses(registeredCourses);
    };

    useEffect(() => {
        isAuthenticated && getRegisteredCourses();
    }, []);

    const registerCourse = async (maKhoaHoc: string, taiKhoan: string) => {
        const res = await getCoursesClient().registerCourse(
            maKhoaHoc,
            taiKhoan
        );
        if (res) {
            toast.info(res || "Đăng kí thành công!");
            getRegisteredCourses();
        }
    };

    const unregisterCourse = async (maKhoaHoc: string, taiKhoan: string) => {
        const res = await getCoursesClient().unregisterCourse(
            maKhoaHoc,
            taiKhoan
        );
        if (res) {
            toast.info(res || "Hủy đăng kí thành công!");
            getRegisteredCourses();
        }
    };

    return (
        <CourseWrapper>
            <CourseContainer>
                <CourseCategory>
                    <Link
                        href={`${DANH_MUC_KHOA_HOC}?maDanhMuc=${course.danhMucKhoaHoc.maDanhMucKhoahoc}`}
                    >
                        {course.danhMucKhoaHoc.tenDanhMucKhoaHoc}
                    </Link>
                </CourseCategory>
                <ImageWrapper>
                    <Link
                        href={`${KHOA_HOC}/[makhoahoc]`}
                        as={`${KHOA_HOC}/${course.maKhoaHoc}`}
                    >
                        <img src={course.hinhAnh} />
                    </Link>
                </ImageWrapper>
                <InfoWrapper>
                    <Link
                        href={`${KHOA_HOC}/[makhoahoc]`}
                        as={`${KHOA_HOC}/${course.maKhoaHoc}`}
                    >
                        <h3>
                            {course.tenKhoaHoc}{" "}
                            <span>
                                ({course?.soLuongHocVien}
                                <i className="fa-solid fa-user-graduate"></i>)
                            </span>
                        </h3>
                    </Link>
                    <p>
                        <i className="fa-solid fa-eye"></i>{" "}
                        {course.luotXem || 0}
                    </p>
                </InfoWrapper>
                <Button
                    onClick={() => {
                        if (!isAuthenticated) {
                            router.push(DANG_NHAP);
                        } else {
                            registeredCourses[course.maKhoaHoc]
                                ? unregisterCourse(
                                      course.maKhoaHoc,
                                      user.taiKhoan
                                  )
                                : registerCourse(
                                      course.maKhoaHoc,
                                      user.taiKhoan
                                  );
                        }
                    }}
                >
                    {registeredCourses[course.maKhoaHoc]
                        ? "Hủy đăng kí"
                        : "Đăng kí"}
                </Button>
            </CourseContainer>
        </CourseWrapper>
    );
};

export default Course;
