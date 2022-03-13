import React from 'react'
import { Loading } from "react-loading-dot";
import { PRIMARY_COLOR } from '../../constants/style';

export default function Loader() {
	return (
        <div style={{background:'#fff'}}>
            <Loading background={PRIMARY_COLOR}/>
        </div>
    );
}
