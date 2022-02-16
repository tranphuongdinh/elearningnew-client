import React from 'react'
import { useRouter } from 'next/router'
import { getCoursesClient } from "../apis/getCoursesClient";
import { NextPage } from 'next';

type TimKiemKhoaHocProps = {
    courses: any;
};

const TimKiemKhoaHoc: NextPage<TimKiemKhoaHocProps> = ({ courses }) => {
    const router = useRouter();
    const { tenKhoaHoc, maNhom } = router.query;

    return (
        <div>
            <div>
                TimKiemKhoaHoc {tenKhoaHoc} {maNhom}
            </div>
            <div>
                {courses.map((course:any) => {
                    return <h1 key={course.maKhoaHoc}>{course.tenKhoaHoc}</h1>;
                })}
            </div>
        </div>
    );
};

export default TimKiemKhoaHoc;

export async function getServerSideProps(ctx:any) {
		const { tenKhoaHoc, maNhom } = ctx.query;
		const data = await getCoursesClient().getCourses({tenKhoaHoc, maNhom});
    return {
        props: {
            courses: data,
        },
    };
}