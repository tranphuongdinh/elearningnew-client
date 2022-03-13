import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import { DANG_NHAP, KHOA_HOC } from "../../constants/navigation";
import { AuthContext } from "../../context/auth/auth.context";
import { Button } from "../Header/Header.style";
import {
    BannerContainer,
    BannerContent,
    BannerImage,
    BannerWrapper,
    ButtonGroup,
} from "./Banner.style";

const Banner: React.FC = () => {
    const {
        authState: { isAuthenticated },
    } = useContext<any>(AuthContext);
    const router = useRouter();
    return (
        <BannerWrapper>
            <video autoPlay muted loop id="backgroundVideo">
                <source src="/videos/background-video.mp4" />
            </video>
            <BannerContainer>
                <Link href={KHOA_HOC}>
                    <BannerImage>
                        <img src="/images/logo.png" alt="Cybersoft" />
                    </BannerImage>
                </Link>
                <BannerContent>
                    <h1>KHỞI ĐẦU SỰ NGHIỆP CỦA BẠN</h1>
                    <p>Trở thành lập trình viên chuyên nghiệp tại Cybersoft</p>
                    <ButtonGroup>
                        <Button>
                            <Link href={KHOA_HOC}>Xem khóa học</Link>
                        </Button>
                        <Button
                            className="no-outline"
                            onClick={() => {
                                isAuthenticated
                                    ? router.push(KHOA_HOC)
                                    : router.push(DANG_NHAP);
                            }}
                        >
                            Tham gia ngay
                        </Button>
                    </ButtonGroup>
                </BannerContent>
            </BannerContainer>
        </BannerWrapper>
    );
};

export default Banner;
