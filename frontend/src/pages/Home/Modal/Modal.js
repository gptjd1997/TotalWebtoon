import {
    Button,
    Label,
    Item,
    Modal,
    Rating,
    Popup,
    Comment,
    Form,
    Header,
    Loader,
    Segment,
} from 'semantic-ui-react'
import React, { useEffect, useReducer, useState } from 'react'
import styled from 'styled-components'
import Axios from 'axios'
import mark from 'pages/Home/Modal/Icons/mark.png'
import nomark from 'pages/Home/Modal/Icons/nomark.png'
import useInput from '../../../useHooks/useInput'

export default React.memo(({ webtoon }) => {
    const [open, setOpen] = React.useState(false)
    const [popopen, setPopopen] = React.useState(false)
    const [rateAble, setRateable] = useState(false)
    const [loading, setLoading] = useState(true)

    const [rating, setRating] = useState(0)
    const [score, setScore] = useState(0)
    const [loggin, setLoggin] = useState(false)
    const [user, setUser] = useState(null)
    const [marked, setMarked] = useState(false)
    const [comments, setComments] = useState(false)

    const [ignored, forceUpdate] = useReducer((x) => x + 1, 0)
    const comment_input = useInput('', 200)

    const handleClick = () => {
        //재 렌더링 함수
        forceUpdate()
    }

    const handleUser = (user) => {
        console.log(user)
        setUser(user)
        Axios({
            method: 'POST',
            url: '/user/find_bookmark',
            params: { user: user._id, webtoon: webtoon._id },
        })
            .then(({ data }) => {
                setMarked(data)
            })
            .catch((err) => console.log(err))
    }

    useEffect(() => {
        if (open) {
            Axios({
                method: 'post',
                url: '/webtoon/find_rate',
                params: { _id: webtoon._id },
            })
                .then(({ data }) => {
                    console.log(data)
                    setScore(data.score)
                })
                .catch((err) => console.log(err))
        }
    }, [open, ignored])

    const marking = (data) => {
        console.log('marking=' + data)
        if (user) {
            if (data) {
                console.log('user=' + user._id)
                //북마크 안되어있을시
                Axios({
                    method: 'post',
                    url: '/user/marking',
                    params: { user: user._id, webtoon: webtoon._id },
                })
                    .then(({ data }) => {
                        console.log('marking = ' + data)
                    })
                    .catch((err) => console.log(err))
                setMarked(data)
            } else {
                //북마크 이미 되어있을시

                Axios({
                    method: 'post',
                    url: '/user/unmarking',
                    params: { user: user._id, webtoon: webtoon._id },
                })
                    .then(({ data }) => {
                        console.log('unmarking = ' + data)
                    })
                    .catch((err) => console.log(err))
                setMarked(data)
            }
        } else {
            setPopopen(true)
            setTimeout(() => {
                setPopopen(false)
            }, 2000)
        }
    }

    const modalOpen = () => {
        Axios({
            url: `/webtoon/comment_find`,
            method: 'post',
            params: { _id: webtoon._id },
        })
            .then(({ data }) => {
                setComments(data)
            })
            .catch((err) => console.log(err))

        const token = localStorage.getItem('token')
        Axios({
            url: `/user/check_login`,
            method: 'post',
            params: { token },
        })
            .then(({ data }) => {
                console.log('data=' + data)
                setLoggin(data.loggin)
                if (data.user) {
                    handleUser(data.user)

                    Axios({
                        url: `/webtoon/check_rating`,
                        method: 'post',
                        params: {
                            user_id: data.user._id,
                            webtoon_id: webtoon._id,
                        },
                    })
                        .then(({ data }) => {
                            setRateable(data.rateAble)
                            setLoading(false)
                            console.log('object')
                        })
                        .catch((err) => console.log(err))
                } else {
                    setRateable(false)
                    setLoading(false)
                }
            })
            .catch((err) => console.log(err))

        setOpen(true)
    }

    const comment_submit = () => {
        const { value } = comment_input
        console.log(value)
        const { setValue } = comment_input
        if (value != '' && loggin) {
            Axios({
                url: `/webtoon/comment_insert`,
                method: 'post',
                params: {
                    comment: value,
                    user: user._id,
                    webtoon: webtoon._id,
                },
            })
                .then(() => {
                    const new_comment = {
                        comment: value,
                        _user: { email: user.email },
                    }
                    setComments([new_comment, ...comments])
                })
                .catch((err) => console.log(err))
        }
        setValue('')
    }

    const rating_submit = () => {
        if (loggin) {
            Axios({
                url: `/webtoon/rating_update`,
                method: 'post',
                params: {
                    score: rating,
                    user_id: user._id,
                    webtoon_id: webtoon._id,
                },
            })
                .then(({ data }) => {
                    handleClick()
                })
                .catch((err) => console.log(err))

            setRateable(false)
        } else {
            setOpen(true)
            setTimeout(() => {
                setOpen(false)
            }, 2000)
        }
    }

    return (
        <Modal
            onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
            }}
            height="500px"
            open={open}
            onClose={() => setOpen(false)}
            onOpen={(e) => {
                modalOpen()
                e.preventDefault()
                e.stopPropagation()
            }}
            trigger={<Info />}
        >
            {marked && open ? (
                <Bookmark_Icon onClick={() => marking(false)} src={mark} />
            ) : (
                <Popup
                    content="로그인이 필요합니다"
                    on="click"
                    open={popopen}
                    trigger={
                        <Bookmark_Icon
                            onClick={() => marking(true)}
                            src={nomark}
                        />
                    }
                />
            )}
            {open ? (
                <>
                    <Modal.Header>
                        <Item.Group style={{ marginRight: '20px' }} divided>
                            <Item>
                                <Item.Image
                                    size="mini"
                                    src={webtoon.thumbnail}
                                />
                                <Item.Content verticalAlign="middle">
                                    {webtoon.title}
                                </Item.Content>

                                <Label
                                    style={{
                                        backgroundColor: 'white',
                                        position: 'relative',
                                    }}
                                >
                                    <Rating
                                        style={{ marginTop: '5px' }}
                                        icon="star"
                                        size="huge"
                                        defaultRating={score}
                                        rating={score}
                                        maxRating={5}
                                        disabled
                                    />
                                    <span
                                        style={{
                                            position: 'relative',
                                            top: '-1px',
                                            fontSize: '19px',
                                            fontWeight: 'bold',
                                            marginLeft: '10px',
                                            marginRight: '3px',
                                        }}
                                    >
                                        {score}/5
                                    </span>
                                </Label>
                            </Item>
                        </Item.Group>
                    </Modal.Header>

                    <Modal.Content image scrolling>
                        <Modal.Description>
                            <Comment.Group>
                                <Header as="h3" dividing>
                                    {console.log(loggin)}
                                    {console.log(rateAble)}
                                    <span>Comments</span>
                                    {loading ? (
                                        <></>
                                    ) : (
                                        <Segment
                                            style={{
                                                position: 'absolute',
                                                bottom: '10px',
                                                left: '10px',
                                                padding: '5px 5px 5px 8px',
                                                display: 'inline-block',
                                            }}
                                            compact
                                        >
                                            {console.log('comment')}
                                            {loggin && rateAble ? (
                                                <>
                                                    <Rating
                                                        style={{
                                                            position:
                                                                'relative',
                                                            top: '3px',
                                                        }}
                                                        maxRating={5}
                                                        onRate={(
                                                            e,
                                                            { rating }
                                                        ) => setRating(rating)}
                                                    />
                                                    <Popup
                                                        content="로그인이 필요합니다"
                                                        on="click"
                                                        open={open}
                                                        trigger={
                                                            <Button
                                                                onClick={
                                                                    rating_submit
                                                                }
                                                                style={{
                                                                    marginLeft:
                                                                        '17px',
                                                                }}
                                                                size="mini"
                                                                color="black"
                                                            >
                                                                확인
                                                            </Button>
                                                        }
                                                    />
                                                </>
                                            ) : !loggin ? (
                                                <>
                                                    <Rating
                                                        style={{
                                                            position:
                                                                'relative',
                                                            top: '3px',
                                                        }}
                                                        maxRating={5}
                                                        onRate={(
                                                            e,
                                                            { rating }
                                                        ) => setRating(rating)}
                                                    />
                                                    <Popup
                                                        content="로그인이 필요합니다"
                                                        on="click"
                                                        open={open}
                                                        trigger={
                                                            <Button
                                                                onClick={
                                                                    rating_submit
                                                                }
                                                                style={{
                                                                    marginLeft:
                                                                        '17px',
                                                                }}
                                                                size="mini"
                                                                color="black"
                                                            >
                                                                확인
                                                            </Button>
                                                        }
                                                    />
                                                </>
                                            ) : (
                                                <span>참여 완료했습니다.</span>
                                            )}
                                        </Segment>
                                    )}
                                </Header>
                                <Form reply>
                                    <Form.TextArea
                                        style={{
                                            maxHeight: 80,
                                            resize: 'none',
                                        }}
                                        {...comment_input}
                                    />
                                    <Button
                                        onClick={comment_submit}
                                        content="작성"
                                        labelPosition="left"
                                        icon="edit"
                                        primary
                                    />
                                </Form>
                                {comments && open ? (
                                    comments.map((comment) => {
                                        return (
                                            <Comment>
                                                <Comment.Avatar src="https://react.semantic-ui.com/images/avatar/small/matt.jpg" />
                                                <Comment.Content>
                                                    <Comment.Author as="a">
                                                        {comment._user.email}
                                                    </Comment.Author>
                                                    <Comment.Metadata>
                                                        <div>
                                                            Today at 5:42PM
                                                        </div>
                                                    </Comment.Metadata>
                                                    <Comment.Text>
                                                        {comment.comment}
                                                    </Comment.Text>
                                                    <Comment.Actions>
                                                        <Comment.Action>
                                                            Reply
                                                        </Comment.Action>
                                                    </Comment.Actions>
                                                </Comment.Content>
                                            </Comment>
                                        )
                                    })
                                ) : (
                                    <Loader
                                        active
                                        className="workaround"
                                        size="medium"
                                    />
                                )}
                            </Comment.Group>
                        </Modal.Description>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button onClick={() => setOpen(false)} primary>
                            종료
                        </Button>
                    </Modal.Actions>
                </>
            ) : (
                <></>
            )}
        </Modal>
    )
})

const Info = styled.button`
    background-color: #fd686c;
    border: none;
    border-radius: 30px;
    font-size: 10px;
    left: 9px;
    top: 9px;
    padding: 7px;
    position: absolute;
    display: none;
    &:hover {
        padding: 8px;
    }
    cursor: pointer;
`

const Bookmark_Icon = styled.img`
    width: 40px;
    height: 40px;
    position: absolute;
    z-index: 1;
    top: -2px;
    right: 0px;
    cursor: pointer;
    transition: all 0.3s;
    &:hover {
        transform: scale(1.1);
    }
`
