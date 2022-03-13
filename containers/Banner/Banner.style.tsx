import styled from "styled-components";
import { Container } from "../../components/Commons/Commons.style";
import { PRIMARY_COLOR } from "../../constants/style";
import { Button } from "../Header/Header.style";

export const BannerWrapper = styled.div`
    position: relative;
    padding: 60px 0;

    @media (max-width: 576px) {
        padding: 30px 0;
    }
    &:after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #000;
        opacity: 0.5;
        z-index: 2;
    }
    #backgroundVideo {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;

export const BannerContainer = styled(Container)`
    position: relative;
    z-index: 3;
    min-height: 80vh;
    justify-content: space-around;
    flex-wrap: wrap-reverse;

    @media (max-width: 768px) {
        min-height: auto;
    }
`;

export const BannerContent = styled.div`
    margin: 20px;
    color: #fff;
    h1 {
        font-size: 50px;
        line-height: 1.2;
        margin: 0;

        @media (max-width: 768px) {
            font-size: 2.25rem;
        }
    }
    p {
        font-style: italic;
    }
`;

export const ButtonGroup = styled.div`
    ${Button} {
        margin-top: 10px;
        border: 2px solid ${PRIMARY_COLOR};
        margin-right: 10px;
    }
    ${Button}.no-outline {
        color: ${PRIMARY_COLOR};
    }
`;

export const BannerImage = styled.div`
    width: 300px;
    height: 300px;
    border-radius: 50%;
    background-color: ${PRIMARY_COLOR};
    box-shadow: 0px 0px 30px #a1a1a1;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.2s ease-in-out;

    img {
        width: 90%;
    }

    @media (max-width: 768px) {
        margin-top: 30px;
        width: 250px;
        height: 250px;
    }

    cursor: pointer;

    &:hover {
        transform: scale(1.1);
        box-shadow: 0px 0px 30px ${PRIMARY_COLOR};
    }

    @media (max-width: 576px) {
        display: none;
    }
`;
