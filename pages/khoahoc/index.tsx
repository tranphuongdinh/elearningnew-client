import React from "react";
import { getCoursesClient } from "../../apis/getCoursesClient";
import { NextPage } from "next";
import { CoursesProps } from "../../models/models";
import Head from "next/head";
import { MainSection } from "../../components/Commons/Commons.style";
import CoursesList from "../../containers/CoursesList/CoursesList";
import { CategoryHeader } from "../danhmuckhoahoc";

const KhoaHoc: NextPage<CoursesProps> = ({
    currentPage,
    count,
    totalPages,
    totalCount,
    courses,
}) => {
    return (
        <div>
            <Head>
                <title>Khóa học | Cybersoft Elearning</title>
            </Head>
            <MainSection>
                <CategoryHeader>
                    <h1>TẤT CẢ KHÓA HỌC</h1>
                </CategoryHeader>
                <CoursesList
                    courses={courses}
                    title={"Danh sách khóa học"}
                    currentPage={currentPage}
                    count={count}
                    totalPages={totalPages}
                    totalCount={totalCount}
                ></CoursesList>
            </MainSection>
        </div>
    );
};

export default KhoaHoc;

export async function getServerSideProps(ctx: any) {
    const { page = 1, pageSize = 15, tenKhoaHoc = "", maNhom = "" } = ctx.query;
    const data = await getCoursesClient().getCoursesByPage(
        parseInt(page),
        parseInt(pageSize),
        tenKhoaHoc,
        maNhom
    );
    return {
        props: {
            currentPage: data.currentPage,
            count: data.count,
            totalPages: data.totalPages,
            totalCount: data.totalCount,
            courses: data.items,
        },
    };
}
