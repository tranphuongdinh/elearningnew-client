import styled from "styled-components";
import { PRIMARY_BACKGROUND_COLOR, PRIMARY_COLOR } from "../../constants/style";
import { Button } from "../../containers/Header/Header.style";

export const ExpandCourseWrapper = styled.div`
    width: 100%;
    background: ${PRIMARY_BACKGROUND_COLOR};
    transition: all 0.2s ease-in-out;
    position: relative;
    background: #fcfcfc;
    box-shadow: 5px 5px 10px #d6d6d6, -5px -5px 10px #ffffff;
`;

export const ExpandCourseContainer = styled.div`
    @media (max-width: 768px) {
        padding-top: 15px;
    }

    display: flex;
    justify-content: flex-start;
    flex-direction: row;
    height: 250px;

    @media (max-width: 768px) {
        p {
            display: none;
        }
        height: auto;
    }
`;

export const ImageWrapper = styled.div`
    position: relative;
    overflow: hidden;
    width: 300px;
    min-width: 300px;
    height: 100%;
    background: url("/images/course-default.jpg") center no-repeat;
    background-size: cover;

    @media (max-width: 768px) {
        display: none;
    }

    img {
        width: 100%;
        object-fit: cover;
    }
`;

export const InfoWrapper = styled.div`
    padding: 20px 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    width: 100%;
    height: 100%;

    h3 {
        max-width: 100%;
        font-size: 1.3rem;
        margin: 15px 0 5px 0;
        text-transform: uppercase;
        cursor: pointer;

        &:hover {
            color: ${PRIMARY_COLOR};
            text-decoration: underline;
        }

        @media (max-width: 576px) {
            font-size: 1.2rem;
            margin: 0;
        }

        span {
            display: inline-block;
            i {
                display: inline-block;
                margin-left: 5px;
                font-size: 1rem;
                line-height: 1.5;
                transform: translateY(-2px);
            }
        }
    }

    p {
        width: 100%;
        overflow: auto;
        text-align: justify;
        text-overflow: ellipsis;
    }

    ${Button} {
        margin-left: auto;
        margin-top: 10px;
    }
`;
