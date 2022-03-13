import React from "react";
import { InputArea, InputWrapper } from "./Input.style";

type InputProps = {
  placeholder: string;
	type: string;
	name: string;
	value: string;
	icon: string;
	onChange: any;
};

const Input: React.FC<InputProps> = ({type, placeholder, name, value, icon, onChange}) => {
    return (
        <InputWrapper>
            <InputArea>
                <i className={icon}></i>
                <input
                    type={type}
                    placeholder={placeholder}
                    name={name}
                    value={value}
                    onChange={onChange}
										required
                />
            </InputArea>
        </InputWrapper>
    );
};

export default Input;
