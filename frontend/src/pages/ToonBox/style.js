import styled from 'styled-components'

export const Display_box = styled.div`
    width: 980px;
`

export const Contents_box = styled.div`
    justify-content: center;
    display: flex;
    box-sizing: content-box;
    background-color: #fff;
    width: 100%;
    min-width: 1022px;
    overflow: hidden;
    padding: 40px;
    margin: 0 auto;
    min-height: 1080px;
`

export const Log_Btn = styled.button`
    margin: 6px 10px;
    margin-left: 180px;
    padding: 7px 3px;
    width: 80px;
    height: auto;
    font-size: 11px;
    background-color: #4c7364;
    color: #cfcfcf;
    border: none;
    border-radius: 5px;
    cursor: pointer;
`
export const Head_Log = styled.div`
    height: 40px;
    width: 100%;
    background-color: #262424;
`

export const Webtoon_box = styled.a`
    transition: all 0.3s;
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.1);
    &:hover {
        box-shadow: 0px 0px 7px 0px rgba(0, 0, 0, 0.4);
    }
    border-radius: 10px;
    color: black;
    text-decoration: none;
    list-style: none;
    width: 125px;
    height: 180px;
    margin-left: 16px;
    margin-bottom: 15px;
    float: left;
    &:nth-child(7n + 1) {
        margin-left: 0;
    }
`

export const Thumb_box = styled.div`
    border-radius: 10px 10px 0 0;
    position: relative;
    overflow: hidden;
    width: 100%;
    height: 125px;
    div {
        width: 100%;
        height: 100%;
        transition: all 0.3s;
        &:hover {
            transform: scale(1.06);
        }

        background-size: 125px 125px;
        background-repeat: no-repeat;
        background-image: url(${(props) =>
            props.thumbnail ||
            'https://www.google.com/url?sa=i&url=https%3A%2F%2Fmypetlife.co.kr%2F42364%2F&psig=AOvVaw381q579WDDD-AO7o1PazN3&ust=1602489487885000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCOiFzNiIrOwCFQAAAAAdAAAAABAD'});
    }
`

export const Webtoon_info = styled.div`
    padding: 11px;
    height: 26px;
`
export const Webtoon_title = styled.span`
    display: block;
    overflow: hidden;
    font-size: 14px;
    font-weight: bold;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 100%;
    color: #535353;
`
