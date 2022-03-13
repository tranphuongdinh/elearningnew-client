import React, { useContext, useEffect } from "react";
import Link from "next/link";
import { CourseProps } from "../../models/models";
import StarRatings from "react-star-ratings";
import { DANG_NHAP, DANH_MUC_KHOA_HOC, KHOA_HOC } from "../../constants/navigation";
import { PRIMARY_COLOR } from "../../constants/style";
import {
    ExpandCourseContainer,
    ExpandCourseWrapper,
    ImageWrapper,
    InfoWrapper,
} from "./ExpandCourse.style";
import { AuthContext } from "../../context/auth/auth.context";
import { getUserClient } from "../../apis/getUserClient";
import { getCoursesClient } from "../../apis/getCoursesClient";
import { toast } from "react-toastify";
import { Button } from "../../containers/Header/Header.style";
import { useRouter } from "next/router";
import { CourseCategory } from "../Course/Course.style";

const ExpandCourse: React.FC<CourseProps> = ({ course }) => {
    const {
        authState: { user, isAuthenticated },
    } = useContext<any>(AuthContext);
    const router = useRouter();

    const [registeredCourses, setRegisteredCourses] = React.useState<any>({});

    const getRegisteredCourses = async () => {
        const { chiTietKhoaHocGhiDanh } = await getUserClient().getUserInfo();

        const registeredCourses = {} as any;
        chiTietKhoaHocGhiDanh.forEach(
            (course: { maKhoaHoc: string | number }) => {
                registeredCourses[course.maKhoaHoc] = course;
            }
        );

        setRegisteredCourses(registeredCourses);
    };

    useEffect(() => {
        isAuthenticated && getRegisteredCourses();
				console.log(course);
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
        <ExpandCourseWrapper>
            <ExpandCourseContainer>
                <ImageWrapper>
                    <img src={course.hinhAnh} alt={course.tenKhoaHoc} />
                </ImageWrapper>
                <CourseCategory>
                    <Link
                        href={`${DANH_MUC_KHOA_HOC}?maDanhMuc=${course.danhMucKhoaHoc.maDanhMucKhoahoc}`}
                    >
                        {course.danhMucKhoaHoc.tenDanhMucKhoaHoc}
                    </Link>
                </CourseCategory>
                <InfoWrapper>
                    <Link
                        href={`${KHOA_HOC}/[makhoahoc]`}
                        as={`${KHOA_HOC}/${course.maKhoaHoc}`}
                    >
                        <h3>{course.tenKhoaHoc} </h3>
                    </Link>

                    <div>
                        <StarRatings
                            rating={course.danhGia}
                            starRatedColor={PRIMARY_COLOR}
                            starDimension="25px"
                            starSpacing="0"
                        ></StarRatings>
                        <span> ({course.soLuongHocVien || 0} học viên)</span>
                    </div>

                    <p>{course.moTa || "Đang cập nhật..."}</p>

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
                </InfoWrapper>
            </ExpandCourseContainer>
        </ExpandCourseWrapper>
    );
};

export default ExpandCourse;
