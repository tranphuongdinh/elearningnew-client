import React from "react";
import { QuotesContainer, QuotesWrapper } from "./Quotes.style";

const Quotes:React.FC = () => {
	return (
        <QuotesWrapper>
            <QuotesContainer>
                <p>
                    “ CyberSoft Academy là học viện tiên phong tại Việt Nam áp
                    dụng phương pháp đào tạo Active Learning và Flipped Learning
                    thông qua các dự án thực tiễn trong lĩnh vực đào tạo CNTT.
                    Học viên sẽ đóng vai trò là một Scrum member trong mô hình
                    Agile để trở thành một lập trình chuyên nghiệp, đáp ứng mọi
                    nhu cầu tuyển dụng của Doanh nghiệp.” <br /> – CYBERSOFT CEO
                </p>
            </QuotesContainer>
        </QuotesWrapper>
    );
}
export default Quotes;