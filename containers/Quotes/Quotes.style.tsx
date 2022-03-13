import styled from "styled-components";
import { Container } from "../../components/Commons/Commons.style";
import { PRIMARY_COLOR } from "../../constants/style";

export const QuotesWrapper = styled.div`
    background-color: #fff;
    background: url("/images/courses-bg.jpg") center no-repeat;
    background-attachment: fixed;
    background-size: cover;
    padding: 40px 0;
`;

export const QuotesContainer = styled(Container)`
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
