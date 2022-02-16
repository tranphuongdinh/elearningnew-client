import React from "react";
import { useRouter } from "next/router";
import { getCoursesClient } from "../apis/getCoursesClient";
import { NextPage } from "next";

type DanhMucKhoaHocProps = {
	courses: any;
}

const DanhMucKhoaHoc: NextPage<DanhMucKhoaHocProps> = ({courses}) => {
    const router = useRouter();

    if (router.isFallback) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            {courses.map((course:any) => {
                return (
                    <div>
                        <a
                            href={`/Chitiet/${course.maKhoaHoc}`}
                            key={course.maKhoaHoc}
                        >
                            {course.tenKhoaHoc}
                        </a>
                    </div>
                );
            })}
        </div>
    );
}

export default DanhMucKhoaHoc;

export async function getServerSideProps() {
    const data = await getCoursesClient().getCourses({});
    return {
        props: {
            courses: data,
        },
    };
}
