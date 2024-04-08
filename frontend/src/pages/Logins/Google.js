import GoogleLogin from 'react-google-login'
import React from 'react'
import Axios from 'axios'

export default ({ logIn, handleClose }) => {
    const responseGoogle = async (res) => {
        console.log('res Google')

        await Axios({
            url: `/user/login`,
            method: 'post',
            params: { email: `${res.profileObj.email}`, social: 'google' },
        })
            .then(({ data }) => {
                localStorage.setItem('token', data)
                if (data) {
                    logIn()
                    handleClose()
                }
            })
            .catch((err) => console.log(err))
    }

    return (
        <GoogleLogin
            clientId="903199270546-5hj1guoii93hp3fvr44bvk7oesud71l1.apps.googleusercontent.com"
            buttonText="Google Login"
            onSuccess={responseGoogle}
            onFailure={(err) => {
                console.log(err)
            }}
            cookiePolicy={'single_host_origin'}
        />
    )
}
