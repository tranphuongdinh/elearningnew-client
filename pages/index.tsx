import type { NextPage } from "next";
import Head from "next/head";
import { getCoursesClient } from "../apis/getCoursesClient";
import { MainSection } from "../components/Commons/Commons.style";
import Banner from "../containers/Banner/Banner";
import Contact from "../containers/Contact/Contact";
import CoursesList from "../containers/CoursesList/CoursesList";
import Quotes from "../containers/Quotes/Quotes";
import { CoursesProps } from "../models/models";

const Home: NextPage<CoursesProps> = ({ courses }) => {
    return (
        <div>
            <Head>
                <title>Trang chủ | Elearning</title>
            </Head>
            <MainSection>
                <Banner></Banner>
                <Quotes></Quotes>
                <CoursesList
                    courses={courses}
                    title={"Danh sách khóa học mới nhất"}
                ></CoursesList>
                <Contact></Contact>
            </MainSection>
        </div>
    );
};

export async function getServerSideProps() {
    const data = await getCoursesClient().getCoursesByPage();
    return {
        props: {
            courses: data?.items || [],
        },
    };
}

export default Home;
