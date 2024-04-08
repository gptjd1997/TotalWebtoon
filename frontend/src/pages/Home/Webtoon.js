import React from 'react'

import Modal from './Modal/Modal'

import {
    Thumb_box,
    Webtoon_box,
    Webtoon_info,
    Webtoon_title,
} from '../ToonBox/style'
import Axios from 'axios'
import styled from 'styled-components'

export default ({ webtoon }) => {
    const views_increase = (e) => {
        Axios({
            url: `/webtoon/views_increase`,
            method: 'post',
            params: { _id: webtoon._id },
        })
            .then()
            .catch((err) => console.log(err))
    }

    return (
        <>
            <Webtoon_box
                href={webtoon.link}
                onClick={views_increase}
                target="_blank"
            >
                <Thumb_box thumbnail={webtoon.thumbnail}>
                    <Background>
                        <Modal webtoon={webtoon} />
                    </Background>
                </Thumb_box>

                <Webtoon_info>
                    <Webtoon_title>{webtoon.title}</Webtoon_title>
                </Webtoon_info>
            </Webtoon_box>
        </>
    )
}

const Background = styled.div`
    border-radius: 10px 10px 0 0;
    &:hover {
        button {
            display: block;
        }
    }
`
