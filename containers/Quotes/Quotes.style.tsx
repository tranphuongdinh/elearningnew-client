import styled from "styled-components";
import { Container } from "../../components/Commons/Commons.style";
import { PRIMARY_COLOR } from "../../constants/style";

export const QuotesWrapper = styled.div`
    background-color: #fff;
    background: url("/images/courses-bg.jpg") center no-repeat;
    background-attachment: fixed;
    background-size: cover;
    padding: 40px 0;
    position: relative;

    &:before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.8);
    }
`;

export const QuotesContainer = styled(Container)`
		position: relative;
		z-index: 2;
		flex-direction: column;

		h1 {
			color: ${PRIMARY_COLOR};
			text-align: center;
		}

		p {
		text-align: center;
		color: #fff;
		font-size: 1.4rem;
		font-weight: 600;
		line-height: 1.5;
		padding: 25px;

		@media (max-width: 768px)	{
			font-size: 1.2rem;
		}

				@media (max-width: 576px)	{
			font-size: 1rem;
			padding: 15px;
		}
	border: 2px solid ${PRIMARY_COLOR};
	background-color: rgba(0,0,0,.8);
`;

export const MapInfo = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    flex-wrap: wrap;

    img {
        width: 100%;
        max-width: 500px;
    }
`;

export const MapNumbers = styled.div``;

export const MapNumbersCount = styled.div`
    text-align: center;
    h2 {
        font-size: 4rem;
        color: ${PRIMARY_COLOR};
        margin-bottom: 10px;

        @media (max-width: 768px) {
            font-size: 3rem;
        }

        @media (max-width: 576px) {
            font-size: 2rem;
        }
    }

    span {
        color: #fff;
        font-size: 1.4rem;
        font-weight: 600;

        @media (max-width: 768px) {
            font-size: 1.2rem;
        }

        @media (max-width: 576px) {
            font-size: 1rem;
        }
    }
`;
