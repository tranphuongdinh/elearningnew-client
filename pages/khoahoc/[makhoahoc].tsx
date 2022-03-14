import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";
import StarRatings from "react-star-ratings";
import { toast } from "react-toastify";
import styled from "styled-components";
import { getCoursesClient } from "../../apis/getCoursesClient";
import { getUserClient } from "../../apis/getUserClient";
import { Container, MainSection } from "../../components/Commons/Commons.style";
import { DANG_NHAP, KHOA_HOC } from "../../constants/navigation";
import { PRIMARY_COLOR } from "../../constants/style";
import { Button } from "../../containers/Header/Header.style";
import { AuthContext } from "../../context/auth/auth.context";
import { ChiTietKhoaHocProps, Course } from "../../models/models";

export const CourseDetailHeader = styled.div`
    width: 100%;
    background: url("/images/course-default.jpg") center no-repeat;
    background-size: cover;
    position: relative;

    &:before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
    }
`;

export const CourseDetailContent = styled.div``;

export const CourseDetailContainer = styled(Container)`
    justify-content: space-between;
    align-items: center;
    min-height: 300px;
    position: relative;
    z-index: 2;

    &.course-description {
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;

        h2 {
            font-size: 2rem;
            color: ${PRIMARY_COLOR};
        }

        p {
            font-size: 16px;
            text-align: justify;
        }
    }

    img {
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
        border-radius: 10px;

        @media (max-width: 692px) {
            display: none;
        }
    }

    .course-content {
        color: #fff;

        h1 {
            font-size: 2.5rem;
            margin: 0;
            @media (max-width: 476px) {
                margin-bottom: 10px;
            }
        }

        .course-rating {
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            justify-content: flex-start;

            p {
                margin-right: 10px;
                @media (max-width: 476px) {
                    display: none;
                }
            }

            margin-bottom: 20px;
        }

        ${Button} {
            text-transform: uppercase;
            font-size: 1.2rem;
        }
    }
`;

const ChiTietKhoaHoc: NextPage<ChiTietKhoaHocProps> = ({ course }) => {
    const router = useRouter();
    const {
        authState: { isAuthenticated, user },
    } = useContext<any>(AuthContext);

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
        if (typeof course === "string") {
            router.push(KHOA_HOC);
        }
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
        <div>
            <Head>
                <title>Chi tiết khóa học | Cybersoft Elearning</title>
            </Head>
            <MainSection>
                <CourseDetailHeader>
                    <CourseDetailContainer>
                        <div className="course-content">
                            <h1>{course.tenKhoaHoc}</h1>
                            <div className="course-rating">
                                <p>Đánh giá khóa học</p>{" "}
                                <StarRatings
                                    rating={course.danhGia}
                                    starRatedColor={PRIMARY_COLOR}
                                    starDimension="25px"
                                    starSpacing="0"
                                ></StarRatings>
                            </div>
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
                        </div>
                        <img src={course.hinhAnh} alt={course.biDanh} />
                    </CourseDetailContainer>
                </CourseDetailHeader>
                <CourseDetailContent>
                    <CourseDetailContainer className="course-description">
                        <h2>Giới thiệu khóa học</h2>
                        <p>{course.moTa || "Đang cập nhật..."}</p>
                    </CourseDetailContainer>
                </CourseDetailContent>
            </MainSection>
        </div>
    );
};

export default ChiTietKhoaHoc;

export async function getServerSideProps(ctx: any) {
    const { makhoahoc } = ctx.query;
    const data = await getCoursesClient().getCourseDetail(makhoahoc);
    return {
        props: {
            course: data,
        },
    };
}
