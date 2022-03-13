import React from "react";
import { useRouter } from "next/router";
import { CoursesGrid, CoursesListContainer, CoursesListWrapper } from "./CoursesList.style";
import { CoursesListProps } from "../../models/models";
import Course from "../../components/Course/Course";
import Paginator from "../../components/Paginator/Paginator";
import ExpandCourse from "../../components/ExpandCourse/ExpandCourse";
import { Button } from "../Header/Header.style";
import { KHOA_HOC, TIM_KIEM_KHOA_HOC } from "../../constants/navigation";

const CoursesList: React.FC<CoursesListProps> = ({ courses, title, currentPage = 0, count = 0, totalPages = 0, totalCount = 0, expand = false}) => {
    const router = useRouter()
    return (
        <CoursesListWrapper>
            <CoursesListContainer>
                <h1>{title}</h1>
                <CoursesGrid className={expand ? "expand" : ""}>
                    {courses?.map((course: any) => {
                        return expand ? (
                            <ExpandCourse
                                key={course.maKhoaHoc}
                                course={course}
                            />
                        ) : (
                            <Course key={course.maKhoaHoc} course={course}/>
                        );
                    })}
                </CoursesGrid>
                {totalCount > 0 && (
                    <Paginator
                        currentPage={currentPage || 0}
                        count={count || 0}
                        totalPages={totalPages || 0}
                        totalCount={totalCount || 0}
                    ></Paginator>
                )}
                {totalCount === 0 && router.pathname === TIM_KIEM_KHOA_HOC && (
                    <Button
                        onClick={() => {
                            router.push("/");
                        }}
                    >
                        Quay về trang chủ
                    </Button>
                )}
                {router.pathname === "/" && (
                    <Button
                        onClick={() => {
                            router.push(KHOA_HOC);
                        }}
                    >
                        Xem thêm
                    </Button>
                )}
            </CoursesListContainer>
        </CoursesListWrapper>
    );
};

export default CoursesList;
