import React from "react";
import {
    MapInfo,
    MapNumbers,
    MapNumbersCount,
    QuotesContainer,
    QuotesWrapper,
} from "./Quotes.style";

const Quotes: React.FC = () => {
    return (
        <QuotesWrapper>
            <QuotesContainer>
                <h1>CYBERSOFT - ĐÀO TẠO LẬP TRÌNH THEO LỘ TRÌNH DỰ ÁN</h1>
                <p>
                    “ CyberSoft Academy là học viện tiên phong tại Việt Nam áp
                    dụng phương pháp đào tạo Active Learning và Flipped Learning
                    thông qua các dự án thực tiễn trong lĩnh vực đào tạo CNTT.
                    Học viên sẽ đóng vai trò là một Scrum member trong mô hình
                    Agile để trở thành một lập trình chuyên nghiệp, đáp ứng mọi
                    nhu cầu tuyển dụng của Doanh nghiệp.” <br /> – CYBERSOFT CEO
                </p>
                <MapInfo>
                    <img src="./images/map.png" alt="Map" />
                    <MapNumbers>
                        <MapNumbersCount>
                            <h2>7</h2>
                            <span>Trung tâm</span>
                        </MapNumbersCount>
                        <MapNumbersCount>
                            <h2>5170</h2>
                            <span>Học viên</span>
                        </MapNumbersCount>
                        <MapNumbersCount>
                            <h2>65</h2>
                            <span>Đối tác</span>
                        </MapNumbersCount>
                    </MapNumbers>
                </MapInfo>
            </QuotesContainer>
        </QuotesWrapper>
    );
};
export default Quotes;
