import React from 'react'
import { useRouter } from 'next/router'
import { ZOOM_JWT_API_KEY, SIGNATURE_ENDPOINT } from '../constants/common'

const Meeting = () => {
    const { query } = useRouter();
    const { mn, email, pwd, name, role } = query;

    const [zoomModule, setZoomModule] = React.useState(null);

    React.useEffect(() => {
        if (zoomModule) {
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
        console.log("window.location.origin: ", window.location.origin);
        zoomModule.init({
            leaveUrl: `${window.location.origin}/thank-you`,
            isSupportAV: true,
            disableCORP: !window.crossOriginIsolated,
            screenShare: true,
            disableRecord: false,
            success: () => {
                console.log(mn, email, pwd, name, role);
                fetch(SIGNATURE_ENDPOINT, {
                    method: "POST",
                    body: JSON.stringify({
                        meetingNumber: mn,
                        role: role,
                    }),
                })
                    .then((res) => res.json())
                    .then((response) => {
                        const signature = response.signature;
                        zoomModule.join({
                            meetingNumber: mn,
                            userName: name,
                            email: email,
                            signature: signature,
                            apiKey: ZOOM_JWT_API_KEY,
                            passWord: pwd,
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
export default Meeting