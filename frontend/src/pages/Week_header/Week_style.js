import styled from 'styled-components'

export const Week_ul = styled.ul`
    width: 600px;
    display: flex;
    margin: 20px auto;
    overflow: hidden;
    margin-bottom: 5px;
    justify-content: space-around;
`

export const Week_li = styled.li`
    display: block;
    list-style: none;
    text-align: center;
`
export const Week_link = styled.div`
    font-weight: bolder;
    color: #616161;
    background-color: ${(props) =>
        props.day === props.select
            ? '#6DF2C1'
            : props.current === props.day && props.select === false
            ? '#6DF2C1'
            : 'white'};

    color: ${(props) =>
        props.day === props.select
            ? 'white'
            : props.current === props.day && props.select === false
            ? 'white'
            : '#616161'};
    &:hover {
        background-color: #6df2c1;
        color: white;
    }

    font-family: Dotum, '돋움', Helvetica, AppleSDGothicNeo, sans-serif;
    border-radius: 100px;
    padding: 19px 0;
    cursor: pointer;
    font-size: 19px;
    display: block;
    text-decoration: none;
    float: left;
    width: 60px;
`
