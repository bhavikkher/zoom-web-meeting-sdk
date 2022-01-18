import React from 'react'
import { useRouter } from 'next/router'
import { ZOOM_JWT_API_KEY, SIGNATURE_ENDPOINT } from '../constants/common'

const meeting = () => {
    const { query } = useRouter();
    const { mn, email, pwd, name } = query;

    const [formData, setFormData] = React.useState({
        userName: name,
        fullname: name,
        email: email,
        password: pwd,
        meetingId: mn,
        role: 0,
    });

    React.useEffect(() => {
        if (Object.keys(query).length) {
            setFormData({ ...formData, "meetingId": mn, email, "password": pwd, userName: name, fullname: name });

        }
    }, [query]);

    const [zoomModule, setZoomModule] = React.useState(null);

    React.useEffect(() => {
        if (zoomModule) {
            console.log(window.location.origin);
            onInitHandle();
        }
    }, [zoomModule])

    React.useEffect(() => {
        loadZoomMeeting();
    }, [])


    const loadZoomMeeting = async () => {
        // The import method below was used because for import { ZoomMtg } from '@zoomus/websdk', 
        // the ZoomMtg CSS will overide the project's React app global CSS and will cause full black screen throughout the web app 
        // and even after if you remove the black screen, it will also cause the web page to not be scrollable or buttons/text field to not be responsive. 
        // Hence, importing the module in useEffect.

        await import("@zoomus/websdk")
            .then(async (module) => {
                try {
                    let module2 = await prepareLoadingWebSDK(module);
                    setZoomModule(module2)
                }
                catch (error) {
                    console.error("error: ", error);
                    // window.location.href = "/"
                }
            })
    }

    const onInitHandle = () => {
        zoomModule.init({
            leaveUrl: `${window.location.origin}/thank-you`,
            isSupportAV: true,
            // disableCORP: !window.crossOriginIsolated,
            // screenShare: true,
            // disableRecord: false,
            success: () => {

                fetch(SIGNATURE_ENDPOINT, {
                    method: "POST",
                    body: JSON.stringify({
                        meetingNumber: formData.meetingId,
                        role: formData.role,
                    }),
                })
                    .then((res) => res.json())
                    .then((response) => {
                        const signature = response.signature;
                        zoomModule.join({
                            meetingNumber: formData.meetingId,
                            userName: formData.userName,
                            signature: signature,
                            apiKey: ZOOM_JWT_API_KEY,
                            passWord: formData.password,
                            success: () => {
                                console.log('join meeting success')
                            },
                            error: (res) => {
                                console.log('Error generating signature')
                                console.log(res)
                            }
                        })
                    });
            },
            error: (error) => {
                console.error(error);
            }
        })
    }

    const prepareLoadingWebSDK = async (module) => {
        // var base_url = window.location.origin;
        let ZoomMtg = module.ZoomMtg
        // await ZoomMtg.setZoomJSLib(`${base_url}/node_modules/@zoomus/websdk/dist/lib`, '/av');
        await ZoomMtg.setZoomJSLib('https://source.zoom.us/2.1.1/lib', '/av');
        await ZoomMtg.preLoadWasm();
        await ZoomMtg.prepareWebSDK();

        return ZoomMtg;
    }

    return (
        <>Loading...</>
    )
}
export default meeting