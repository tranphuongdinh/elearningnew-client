import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getCoursesClient } from "../apis/getCoursesClient";
import { NextPage } from "next";
import { CoursesProps } from "../models/models";
import Head from "next/head";
import { MainSection } from "../components/Commons/Commons.style";
import CoursesList from "../containers/CoursesList/CoursesList";

const TimKiemKhoaHoc: NextPage<CoursesProps> = ({
    currentPage,
    count,
    totalPages = 0,
    totalCount = 0,
    courses,
}) => {
    const router = useRouter();

    const {
        page = 1,
        pageSize = 10,
        tenKhoaHoc = "",
        maNhom = "",
    } = router.query;

    return (
        <div>
            <Head>
                <title>Tìm kiếm khóa học | Cybersoft Elearning</title>
            </Head>
            <MainSection>
                <CoursesList
                    courses={courses}
                    title={
                        totalCount > 0
                            ? `Tìm thấy ${totalCount} khóa học ${
                                  tenKhoaHoc ? tenKhoaHoc : ""
                              }`
                            : "Không tìm thấy khóa học"
                    }
                    currentPage={currentPage}
                    count={count}
                    totalPages={totalPages}
                    totalCount={totalCount}
                    expand={true}
                ></CoursesList>
            </MainSection>
        </div>
    );
};

export default TimKiemKhoaHoc;

export async function getServerSideProps(ctx: any) {
    const { page = 1, pageSize = 5, tenKhoaHoc = "", maNhom = "" } = ctx.query;
    const data = await getCoursesClient().getCoursesByPage(
        parseInt(page),
        parseInt(pageSize),
        tenKhoaHoc,
        maNhom
    );

    if (!data?.totalCount) {
        return {
            props: {
                currentPage: 0,
                count: 0,
                totalPages: 0,
                totalCount: 0,
                courses: data.items || [],
            },
        };
    }

    return {
        props: {
            currentPage: data.currentPage,
            count: data.count,
            totalPages: data.totalPages,
            totalCount: data.totalCount,
            courses: data.items || [],
        },
    };
}
