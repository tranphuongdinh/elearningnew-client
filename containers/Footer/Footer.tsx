import React from "react";
import { useRouter } from "next/router";
import {
    ButtonSocial,
    EventInput,
    EventWrapper,
    FacebookEmbed,
    FooterContainer,
    FooterEnd,
    FooterWrapper,
} from "./Footer.style";
import Input from "../../components/Input/Input";
import { Button } from "../Header/Header.style";

const Footer: React.FC = () => {
    const router = useRouter();
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [phone, setPhone] = React.useState("");
    const formInputs = [
        {
            type: "text",
            placeholder: "*Họ và tên",
            name: "name",
            value: name,
            icon: "fa-solid fa-user",
            error: "",
            onChange: (e: any) => {
                setName(e.target.value);
            },
        },
        {
            type: "email",
            placeholder: "*Email",
            name: "email",
            value: email,
            icon: "fa-solid fa-envelope",
            onChange: (e: any) => {
                setEmail(e.target.value);
            },
        },
        {
            type: "tel",
            placeholder: "*Số điện thoại",
            name: "phone",
            value: phone,
            icon: "fa-solid fa-phone",
            onChange: (e: any) => {
                setPhone(e.target.value);
            },
        },
    ];

    const handleSubmit = (e: any) => {
        e.preventDefault();
        const data = {
            name,
            email,
            phone,
        };
        setName("");
        setEmail("");
        setPhone("");
    };

    return (
        <FooterWrapper>
            <FooterContainer>
                <EventWrapper>
                    <h3>Nhận tin và sự kiện khuyến mãi</h3>
                    <p>
                        CyberSoft sẽ gởi các khóa học trực tuyến & các chương
                        trình CyberLive hoàn toàn MIỄN PHÍ và các chương trình
                        KHUYẾN MÃI hấp dẫn đến các bạn.
                    </p>
                    <div>
                        <form>
                            <EventInput>
                                <input
                                    type="email"
                                    required
                                    placeholder="*Email của bạn"
                                />
                                <button type="submit">Gửi</button>
                            </EventInput>
                        </form>
                    </div>
                </EventWrapper>
                <EventWrapper>
                    <h3>Đăng kí tư vấn</h3>
                    <form
                        onSubmit={(e) => {
                            handleSubmit(e);
                        }}
                    >
                        {formInputs.map((item, index) => {
                            return (
                                <div key={index}>
                                    <Input
                                        type={item.type}
                                        placeholder={item.placeholder}
                                        name={item.name}
                                        value={item.value}
                                        icon={item.icon}
                                        onChange={item.onChange}
                                    ></Input>
                                </div>
                            );
                        })}
                        <Button type="submit">Đăng kí</Button>
                    </form>
                </EventWrapper>
                <FacebookEmbed>
                    <h3>Fanpage</h3>
                    <iframe
                        src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Flophocviet%2F&tabs=timeline&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId"
                        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                    ></iframe>
                </FacebookEmbed>
            </FooterContainer>
            <FooterEnd>
                <h5>2021 | Designed by Elearning</h5>
                <div style={{ display: "flex" }}>
                    <a
                        href="https://www.facebook.com/lophocviet/"
                        target="_blank"
                    >
                        <ButtonSocial backgroundColor="blue">
                            <i className="fa-brands fa-facebook"></i>
                        </ButtonSocial>
                    </a>
                    <a
                        href="https://www.youtube.com/channel/UCWc3ASTJcb0FeO2oFfX8IDQ"
                        target="_blank"
                    >
                        <ButtonSocial backgroundColor="red">
                            <i className="fa-brands fa-youtube"></i>
                        </ButtonSocial>
                    </a>
                </div>
            </FooterEnd>
        </FooterWrapper>
    );
};

export default Footer;
