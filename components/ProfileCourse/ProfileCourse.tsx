import React from "react";
import Link from "next/link";
import { CourseProps } from "../../models/models";

import StarRatings from "react-star-ratings";
import { PRIMARY_COLOR } from "../../constants/style";
import { Button } from "../../containers/Header/Header.style";
import { KHOA_HOC } from "../../constants/navigation";
import { getCoursesClient } from "../../apis/getCoursesClient";
import { toast } from "react-toastify";
import {
    ExpandCourseContainer,
    ExpandCourseWrapper,
    ImageWrapper,
    InfoWrapper,
} from "../ExpandCourse/ExpandCourse.style";

const ProfileCourse: React.FC<CourseProps> = ({
    course,
    taiKhoan = "",
    updateUser,
}) => {
    const unregisterCourse = async (maKhoaHoc: string, taiKhoan: string) => {
        const res = await getCoursesClient().unregisterCourse(
            maKhoaHoc,
            taiKhoan
        );
        if (res) {
            toast.info(res || "Hủy đăng kí thành công!");
            updateUser();
        }
    };
    return (
        <ExpandCourseWrapper>
            <ExpandCourseContainer>
                <ImageWrapper>
                    <img src={course.hinhAnh} alt={course.tenKhoaHoc} />
                </ImageWrapper>
                <InfoWrapper style={{ paddingTop: "0" }}>
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

                    <p>{course.moTa}</p>

                    <Button
                        onClick={() => {
                            unregisterCourse(course.maKhoaHoc, taiKhoan);
                        }}
                    >
                        Hủy đăng kí
                    </Button>
                </InfoWrapper>
            </ExpandCourseContainer>
        </ExpandCourseWrapper>
    );
};

export default ProfileCourse;
