import styled from "styled-components";
import { Container } from "../../components/Commons/Commons.style";
import { PRIMARY_COLOR } from "../../constants/style";

export const CoursesListWrapper = styled.div`
    background-color: #fff;
    position: relative;
    padding: 30px 0;

    @media (max-width: 576px) {
        padding: 10px 0;
    }

    &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(255, 255, 255, 0.9);
    }
`;

export const CoursesListContainer = styled(Container)`
    flex-direction: column;
    h1 {
        color: ${PRIMARY_COLOR};
        text-transform: uppercase;
        text-align: center;
    }
    z-index: 3;
    position: relative;
`;

export const CoursesGrid = styled.div`
    margin: 30px 0;
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    grid-column-gap: 40px;
    grid-row-gap: 40px;

    @media (max-width: 476px) {
        grid-template-columns: repeat(auto-fit, minmax(100%, 1fr));
    }

    &.expand {
        display: flex;
        flex-direction: column;
    }
`;
