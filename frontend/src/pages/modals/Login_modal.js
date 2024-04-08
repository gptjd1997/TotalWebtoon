import React from 'react'
import { Modal } from 'semantic-ui-react'
import { Log_Btn } from '../ToonBox/style'

import Google from '../Logins/Google'

function exampleReducer(state, action) {
    switch (action.type) {
        case 'close':
            return { open: false }
        case 'open':
            return { open: true, size: action.size }
        default:
            throw new Error('Unsupported action...')
    }
}

const LoginBtn = ({ logIn }) => {
    const [state, dispatch] = React.useReducer(exampleReducer, {
        open: false,
        size: undefined,
    })
    const { open, size } = state

    return (
        <div>
            <Log_Btn onClick={() => dispatch({ type: 'open', size: 'mini' })}>
                로그인
            </Log_Btn>
            <Modal
                size={size}
                open={open}
                onClose={() => dispatch({ type: 'close' })}
            >
                <Modal.Header>로그인</Modal.Header>
                <Modal.Content>
                    <Google
                        logIn={logIn}
                        handleClose={() =>
                            dispatch({ type: 'close', size: 'mini' })
                        }
                    />
                </Modal.Content>
            </Modal>
        </div>
    )
}

export default React.memo(LoginBtn)
