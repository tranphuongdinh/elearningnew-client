import { NextPage } from 'next';
import { useRouter } from 'next/router'
import React from 'react'
import { getCoursesClient } from '../../apis/getCoursesClient';

type ChiTietKhoaHocProps = {
		course: any;
}

const ChiTietKhoaHoc: NextPage<ChiTietKhoaHocProps> = ({course}) => {
    const router = useRouter();
    const { makhoahoc } = router.query;

    return <div>ChiTietKhoaHoc {JSON.stringify(course)}</div>;
};

export default ChiTietKhoaHoc;

export async function getServerSideProps(ctx:any) {
	const { makhoahoc } = ctx.query;
	const data = await getCoursesClient().getCourseDetail(makhoahoc);
	return {
		props: {
			course: data
		}
	}
}
