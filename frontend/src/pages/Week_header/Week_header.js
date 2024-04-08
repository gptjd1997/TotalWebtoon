import React, { useState } from 'react'
import { Week_ul, Week_li, Week_link } from './Week_style'

const Week_Header = ({ week_change, current }) => {
    const [day, setDay] = useState(false)
    return (
        <Week_ul>
            <Week_li>
                <Week_link
                    current={current}
                    select={day}
                    day="Monday"
                    onClick={() => {
                        setDay('Monday')
                        week_change('Monday')
                    }}
                >
                    월
                </Week_link>
            </Week_li>
            <Week_li>
                <Week_link
                    current={current}
                    select={day}
                    day="Tuesday"
                    onClick={() => {
                        week_change('Tuesday')
                        setDay('Tuesday')
                    }}
                >
                    화
                </Week_link>
            </Week_li>
            <Week_li>
                <Week_link
                    current={current}
                    select={day}
                    day="Wednesday"
                    onClick={() => {
                        week_change('Wednesday')
                        setDay('Wednesday')
                    }}
                >
                    수
                </Week_link>
            </Week_li>
            <Week_li>
                <Week_link
                    current={current}
                    select={day}
                    day="Thursday"
                    onClick={() => {
                        week_change('Thursday')
                        setDay('Thursday')
                    }}
                >
                    목
                </Week_link>
            </Week_li>
            <Week_li>
                <Week_link
                    current={current}
                    select={day}
                    day="Friday"
                    onClick={() => {
                        week_change('Friday')
                        setDay('Friday')
                    }}
                >
                    금
                </Week_link>
            </Week_li>
            <Week_li>
                <Week_link
                    current={current}
                    select={day}
                    day="Saturday"
                    onClick={() => {
                        week_change('Saturday')
                        setDay('Saturday')
                    }}
                >
                    토
                </Week_link>
            </Week_li>
            <Week_li>
                <Week_link
                    current={current}
                    select={day}
                    day="Sunday"
                    onClick={() => {
                        week_change('Sunday')
                        setDay('Sunday')
                    }}
                >
                    일
                </Week_link>
            </Week_li>
        </Week_ul>
    )
}

export default React.memo(Week_Header)
