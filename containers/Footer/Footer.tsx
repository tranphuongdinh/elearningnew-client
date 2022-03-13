import React from "react";
import {
    AddressDetail,
    AddressWrapper,
    ButtonSocial,
    EventInput,
    EventWrapper,
    FacebookEmbed,
    FooterContainer,
    FooterEnd,
    FooterWrapper,
    AddressContainer,
    AddressDetailWrapper,
} from "./Footer.style";
import Input from "../../components/Input/Input";
import { Button } from "../Header/Header.style";
import { toast } from "react-toastify";

const Footer: React.FC = () => {
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [phone, setPhone] = React.useState("");

    const addresses = [
        {
            city: "TP. Hồ Chí Minh",
            address: [
                {
                    title: "Trụ sở: 112 Cao Thắng, Quận 3",
                    detail: (
                        <p>
                            Hotline: 096.105.1014 – 077.886.1911
                            <br />
                            Địa chỉ: Tầng 5, toà nhà Suri, 112 Cao Thắng, Quận
                            3, TPHCM
                        </p>
                    ),
                },
                {
                    title: "459 Sư Vạn Hạnh, Quận 10",
                    detail: (
                        <p>
                            Hotline: 096.105.1014 – 077.886.1911
                            <br /> Địa chỉ: Tầng 2, toà nhà WinHome, 459 Sư Vạn
                            hạnh, Quận 10, TPHCM
                        </p>
                    ),
                },
                {
                    title: "82 Ung Văn Khiêm, Bình Thạnh",
                    detail: (
                        <p>
                            Hotline: 096.105.1014 – 077.886.1911 <br />
                            Địa chỉ: 82 Ung Văn Khiêm, Bình Thạnh, TPHCM
                        </p>
                    ),
                },
                {
                    title: "110 Đường số 10, Park Hill City Land, Phan Văn Trị, Gò Vấp",
                    detail: (
                        <p>
                            Hotline: 096.105.1014 – 077.886.1911
                            <br /> Địa chỉ: 110 Đường số 10, Park Hill City
                            Land, Phan Văn Trị, Gò Vấp, TPHCM
                        </p>
                    ),
                },
                {
                    title: "56 Lê Cảnh Tuân, Tân Phú",
                    detail: (
                        <p>
                            Hotline: 096.105.1014 – 077.886.1911 <br />
                            Địa chỉ: 56 Lê Cảnh Tuân, Tân Phú, TPHCM
                        </p>
                    ),
                },
                {
                    title: "6C Đường số 8, Linh Tây, Thủ Đức (gần ĐH Cảnh Sát)",
                    detail: (
                        <p>
                            Hotline: 096.105.1014 – 077.886.1911
                            <br /> Địa chỉ: 6C Đường số 8, Linh Tây, Thủ Đức,
                            TPHCM
                        </p>
                    ),
                },
            ],
        },
        {
            city: "Đà Nẵng",
            address: [
                {
                    title: "103 Nguyễn Hữu Dật, Hải Châu",
                    detail: (
                        <p>
                            Hotline: 096.105.1014 – 077.886.1911 <br /> Địa chỉ:
                            103 Nguyễn Hữu Dật, Hải Châu, ĐN
                        </p>
                    ),
                },
            ],
        },
    ];

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

        //handle send data...
        toast.success("Đăng kí tư vấn thành công!");

        //reset form
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
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                toast.success("Đăng kí nhận tin thành công!");
                            }}
                        >
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
            <AddressContainer>
                {addresses.map((address, index) => {
                    return (
                        <AddressWrapper key={`address-${index}`}>
                            <h3>{address.city}</h3>
                            <AddressDetailWrapper>
                                {address.address.map((addr, index) => {
                                    return (
                                        <AddressDetail key={`addr-${index}`}>
                                            <h4>{addr.title}</h4>
                                            {addr.detail}
                                        </AddressDetail>
                                    );
                                })}
                            </AddressDetailWrapper>
                        </AddressWrapper>
                    );
                })}
            </AddressContainer>
            <FooterEnd>
                <h5>2021 | Designed by Cybersoft Elearning</h5>
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
