import styled from "styled-components";
import { Button } from "../../containers/Header/Header.style";
import { CourseContainer, CourseWrapper, ImageWrapper } from "../Course/Course.style";

export const ProfileCourseWrapper = styled(CourseWrapper)`
    width: 100%;
		height: 100%;

		${CourseContainer} {
			height: 100%;
		}
		

    ${ImageWrapper} {
			height: 200px;
		}

		${Button} {
			width: 100%;
			font-size: 1.1rem;
		}
`;

export const ProfileCourseContainer = styled.div`
	display: flex;
	flex-direction: column;
`;