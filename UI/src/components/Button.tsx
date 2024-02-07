import React, { FC } from 'react'

interface ButtonProps {
    title: string
    active: boolean
    onClickFunc: () => void
}

const Button: FC<ButtonProps> = ({title, active, onClickFunc}) => {
    console.log({title, active})
    return <button onClick={onClickFunc} style={{
        background: (active) ? 'lightblue' : 'white',
        paddingTop: 10,
        paddingBottom: 10,
        paddingRight: 20,
        paddingLeft: 20,
        borderRadius: 10,
        border: '1px black solid'
    }}>{title}</button>
}

export default Button;