import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import Webtoon from './Webtoon'
import { Contents_box, Display_box, Head_Log, Log_Btn } from '../ToonBox/style'
import { Week_header } from '../pages'
import LoginBtn from '../modals/Login_modal'
import { Loader, Popup } from 'semantic-ui-react'
import styled from 'styled-components'

export default (props) => {
    const week = new Array(
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
    )
    const d = new Date()

    const [open, setOpen] = useState(false)
    const [loggin, setLoggin] = useState(false)
    const [sort, setSort] = useState('views')

    const [loading, setLoading] = useState(false) // 로딩용
    const [display, setDisplay] = useState(true) // 북마크 확인용

    const [user, setUser] = useState(false)
    const [webtoons, setWebtoons] = useState({})
    const [selected, setSelected] = useState(week[d.getDay()])
    const [_class, setClass] = useState(1)
    const [bookmarks, setBookmarks] = useState([])

    useEffect(() => {
        const token = localStorage.getItem('token')
        Axios({
            url: `/user/check_login`,
            method: 'post',
            params: { token },
        })
            .then(({ data }) => {
                setLoggin(data.loggin)
                setUser(data.user)
            })
            .catch((err) => console.log(err))
    }, [])

    const logOut = () => {
        localStorage.removeItem('token')
        setLoggin(false)
    }

    const logIn = () => {
        setLoggin(true)
    }

    const week_change = (value) => {
        setSelected(value)
    }

    useEffect(() => {
        console.log(console.time())
        const get_data = (value) => {
            return Axios({
                url: `/webtoon/find`,
                method: 'post',
                params: { day: `${value}` },
            })
                .then(({ data }) => {
                    return data
                })
                .catch((err) => {
                    console.log(err)
                })
        }
        const init = async () => {
            const Monday = await get_data('Monday')
            const Tuesday = await get_data('Tuesday')
            const Wednesday = await get_data('Wednesday')
            const Thursday = await get_data('Thursday')
            const Friday = await get_data('Friday')
            const Saturday = await get_data('Saturday')
            const Sunday = await get_data('Sunday')
            setWebtoons({
                Monday: Monday,
                Tuesday: Tuesday,
                Wednesday: Wednesday,
                Thursday: Thursday,
                Friday: Friday,
                Saturday: Saturday,
                Sunday: Sunday,
            })
            console.log(webtoons)

            setLoading(true)
        }
        init()
        console.log(console.time)
    }, [])

    const change_sort = (value) => {
        setSort(value)
        console.log(value)
    }

    const change = (e) => {
        setClass(e)
    }

    const find_bookmarks = (e) => {
        if (user) {
            Axios({
                params: { _id: user._id },
                method: 'post',
                url: '/user/find_bookmark_webtoons',
            })
                .then(({ data }) => {
                    setBookmarks(data)
                })
                .catch((err) => console.log(err))
        } else {
            setOpen(true)
            setTimeout(() => {
                setOpen(false)
            }, 2000)
        }
    }

    return (
        <>
            <Head_Log>
                {loggin ? (
                    <Log_Btn className={'logBtn'} onClick={logOut}>
                        로그아웃
                    </Log_Btn>
                ) : (
                    <LoginBtn logIn={logIn} />
                )}
            </Head_Log>
            <div className="header_Wrap">
                <Header>
                    <Week_header
                        week_change={week_change}
                        current={week[d.getDay()]}
                    />

                    <div
                        style={{
                            marginTop: '40px',
                            overflow: 'hidden',
                        }}
                    >
                        <Button_style
                            className={_class === 1 ? 'selected_sort' : ''}
                            onClick={(e) => {
                                setDisplay(true)
                                change_sort('views')
                                change(1)
                            }}
                        >
                            조회수 순
                        </Button_style>
                        <Button_style
                            className={_class === 2 ? 'selected_sort' : ''}
                            onClick={(e) => {
                                setDisplay(true)
                                change_sort('score')
                                change(2)
                            }}
                        >
                            별점 순
                        </Button_style>
                        <Popup
                            content="로그인이 필요합니다"
                            on="click"
                            open={open}
                            trigger={
                                <Button_style
                                    className={
                                        _class === 3 ? 'selected_sort' : ''
                                    }
                                    onClick={(e) => {
                                        setDisplay(false)
                                        find_bookmarks()
                                        change(3)
                                    }}
                                >
                                    북마크
                                </Button_style>
                            }
                        />
                    </div>
                </Header>
            </div>
            <Contents_box>
                <Display_box>
                    {loading && display ? (
                        webtoons[selected]
                            .sort((a, b) => (a[sort] < b[sort] ? 1 : -1))
                            .map((webtoon) => (
                                <Webtoon place webtoon={webtoon} />
                            ))
                    ) : loading && !display ? (
                        bookmarks.map((webtoon) => (
                            <Webtoon place webtoon={webtoon} />
                        ))
                    ) : (
                        <Loader active className="workaround" size="medium" />
                    )}
                </Display_box>
            </Contents_box>
        </>
    )
}

const Button_style = styled.button`
    font-family: Dotum;
    border: none;
    margin: 0 2px 0 0;
    padding: 5px;
    width: 80px;
    font-size: 14px;
    font-weight: bold;
    color: #4c7364;
    background-color: #d0ece1;
    border-radius: 6px 6px 0 0;
    cursor: pointer;
`

const Header = styled.div`
    width: 900px;
`
