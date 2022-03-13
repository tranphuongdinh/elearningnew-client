import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { getCoursesClient } from "../apis/getCoursesClient";
import { MainSection } from "../components/Commons/Commons.style";
import { KHOA_HOC } from "../constants/navigation";
import { PRIMARY_BACKGROUND_COLOR, PRIMARY_COLOR } from "../constants/style";
import CoursesList from "../containers/CoursesList/CoursesList";
import { CoursesProps } from "../models/models";

export const CategoryHeader = styled.div`
    background: ${PRIMARY_BACKGROUND_COLOR};
    h1 {
        color: ${PRIMARY_COLOR};
        text-transform: uppercase;
    }
    padding: 15px 30px;
`;

const Home: NextPage<CoursesProps> = ({ courses }) => {
    const router = useRouter();
    const [categoriesMap, setCategoriesMap] = useState({} as any);
    const { maDanhMuc = "" } = router.query;

    const getCategories = async () => {
        const res = await getCoursesClient().getCategory();
        if (res?.length) {
            let map = {} as any;
            res.forEach((item: any) => {
                map[item.maDanhMuc] = item.tenDanhMuc;
            });

            if (!map[maDanhMuc.toString()]) {
                router.push(KHOA_HOC);
            }

            setCategoriesMap(map);
        }
    };

    useEffect(() => {
        getCategories();
    }, []);

    return (
        <div>
            <Head>
                <title>Danh mục khóa học | Elearning</title>
            </Head>
            <MainSection>
                <CategoryHeader>
                    <h1>{categoriesMap[maDanhMuc.toString()]}</h1>
                </CategoryHeader>
                {typeof courses !== "string" && (
                    <CoursesList
                        courses={courses}
                        title={"Các khóa học phổ biến"}
                    ></CoursesList>
                )}
            </MainSection>
        </div>
    );
};

export async function getServerSideProps(ctx: any) {
    const maDanhMuc = ctx.query.maDanhMuc;
    const data = await getCoursesClient().getCoursesByCategory(maDanhMuc);
    return {
        props: {
            courses: data || [],
        },
    };
}

export default Home;
