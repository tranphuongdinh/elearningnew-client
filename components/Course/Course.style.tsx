import styled from "styled-components";
import { PRIMARY_BACKGROUND_COLOR, PRIMARY_COLOR, PRIMARY_COLOR_HOVER } from "../../constants/style";

export const CourseCategory = styled.span`
    position: absolute;
    top: 0;
    right: 0;
    background-color: ${PRIMARY_COLOR};
    display: block;
    padding: 5px 10px;
    color: #000;
    z-index: 2;
    transition: all 0.2s ease-in-out;
		border-bottom-left-radius: 10px;
		color: #fff;
		&:hover {
			background-color: ${PRIMARY_COLOR_HOVER};	
		}
`;

export const CourseWrapper = styled.div`
    width: 100%;
    background: ${PRIMARY_BACKGROUND_COLOR};
    box-shadow: 10px 10px 24px #e6e6e6, -10px -10px 24px #ffffff;
    position: relative;

    &:hover {
        img {
            transform: scale(1.2);
        }
    }
`;


export const CourseContainer = styled.div`
    background: ${PRIMARY_BACKGROUND_COLOR};
    display: flex;
    justify-content: space-between;
    flex-direction: column;
		height: 100%;
`;

export const ImageWrapper = styled.div`
		cursor: pointer;
		overflow: hidden;
    width: 100%;
    height: 200px;
    background: url("/images/course-default.jpg") center no-repeat;
		background-size: cover;
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
				transition: all 0.2s ease-in-out;
    }
`;

export const InfoWrapper = styled.div`
    padding: 10px 20px;

    h3 {
				cursor: pointer;
        max-width: 100%;
        text-overflow: ellipsis;
        overflow: hidden;
        font-size: 1.4rem;
        color: ${PRIMARY_COLOR};

				&:hover {
					color: ${PRIMARY_COLOR_HOVER};
				}

				span {
					display: inline-block;
					color: #fff;
					i {
						display: inline-block;
						margin-left:5px;
						font-size: 1.2rem;
						line-height: 1.5;
						transform: translateY(-2px);
					}
				}
    }

    p {
        text-align: right;
      	color: #fff;
    }
`;