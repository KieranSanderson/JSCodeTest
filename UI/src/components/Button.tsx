import React, { FC } from 'react'

interface ButtonProps {
    title: string
}

const Button: FC<ButtonProps> = ({title}) => {
    return <button style={{
        background: 'white',
        paddingTop: 10,
        paddingBottom: 10,
        paddingRight: 20,
        paddingLeft: 20,
        borderRadius: 10,
        border: '1px black solid'
    }}>{title}</button>
}

export default Button;