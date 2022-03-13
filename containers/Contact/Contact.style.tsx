import styled from "styled-components";
import { Container } from "../../components/Commons/Commons.style";
import { PRIMARY_COLOR } from "../../constants/style";

export const ContactWrapper = styled.div`
    background: url("/images/contact-bg.jpg") center no-repeat;
    background-size: cover;
    padding: 50px 0;

		@media	(max-width: 576px) {
			padding: 20px 0;
		}	
`;

export const ContactContainer = styled(Container)`
    justify-content: space-between;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    grid-column-gap: 50px;
    grid-row-gap: 50px;
`;

export const ContactImage = styled.div`
    width: 100%;

    @media (max-width: 992px) {
        display: none;
    }

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;

export const ContactForm = styled.form`
    padding: 20px 40px 50px 40px;
    border-radius: 5px;
    box-shadow: 0px 0px 10px rgba(46, 46, 46, 0.5);
    width: 100%;

		@media (max-width: 576px) {
			padding: 15px;
		}

    h1 {
        color: ${PRIMARY_COLOR};
        text-transform: uppercase;
    }
    background: rgba(0, 0, 0, 0.7);
    input,
    textarea {
        outline: none;
        border: 2px solid transparent;
        &:focus {
            border: 2px solid ${PRIMARY_COLOR};
        }
    }
    textarea {
        width: 100%;
        min-height: 150px;
        margin-bottom: 10px;
        padding: 5px 25px 5px 10px;
    }
`;
