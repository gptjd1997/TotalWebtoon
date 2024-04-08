import { useState } from 'react'

export default (initialValue, maxlength = 0) => {
    const [value, setValue] = useState(initialValue)
    const onChange = (event) => {
        const {
            target: { value },
        } = event

        var content = value
        //글자수 실시간 카운팅

        if (content.length > maxlength && maxlength !== 0) {
            alert(`최대 ${maxlength}자까지 입력 가능합니다.`)
            content = content.substring(0, maxlength)
        }

        setValue(content)
        console.log(content)
    }
    return { value, setValue, onChange }
}
