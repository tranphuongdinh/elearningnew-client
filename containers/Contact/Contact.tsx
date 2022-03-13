import { useRouter } from "next/router";
import React, { useRef } from "react";
import TextareaAutosize from "react-textarea-autosize";
import Input from "../../components/Input/Input";
import { Button } from "../Header/Header.style";
import {
    ContactContainer,
    ContactForm,
    ContactImage,
    ContactWrapper,
} from "./Contact.style";

const Contact: React.FC = () => {
    const router = useRouter();
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [phone, setPhone] = React.useState("");
    const [message, setMessage] = React.useState("");

    const handleSubmit = (e: any) => {
        e.preventDefault();
        const data = {
            name,
            email,
            phone,
            message,
        };
				setName("");
				setEmail("");
				setPhone("");
				setMessage("");
    };

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

    return (
        <ContactWrapper id="contact">
            <ContactContainer>
                <ContactImage>
                    <img src="/images/contact.png" alt="Contact" />
                </ContactImage>
                <ContactForm
                    onSubmit={(e) => {
                        handleSubmit(e);
                    }}
                >
                    <h1>Liên hệ tư vấn</h1>
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
                    <TextareaAutosize
                        placeholder="Bạn cần tư vấn thêm về chương trình, vui lòng để lại tin nhắn tại đây"
                        onChange={(e) => {
                            setMessage(e.target.value);
                        }}
                        value={message}
                    ></TextareaAutosize>
                    <Button type="submit">Đăng kí tư vấn</Button>
                </ContactForm>
            </ContactContainer>
        </ContactWrapper>
    );
};

export default Contact;
