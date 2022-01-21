import React from 'react'
import { useRouter } from 'next/router'
import { ZOOM_JWT_API_KEY, ZOOM_JWT_API_SECRET } from '../constants/common'

// SDK styles
import 'node_modules/@zoomus/websdk/dist/css/bootstrap.css'
import 'node_modules/@zoomus/websdk/dist/css/react-select.css'

const Meeting = () => {
    const { query } = useRouter();
    const { mn, email, pwd, name, role, lang = 'en-US', china = 0 } = query;

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
        await import("@zoomus/websdk")
            .then(async (module) => {
                try {
                    let module2 = await prepareLoadingWebSDK(module);
                    setZoomModule(module2)
                }
                catch (error) {
                    console.error("loadZoomMeeting: ", error);
                    // window.location.href = "/"
                }
            })
    }

    const onInitHandle = () => {
        console.log("window.location.origin: ", window.location.origin);

        zoomModule.init({
            leaveUrl: `${window.location.origin}/thank-you`,
            isSupportAV: true,
            // disableCORP: !window.crossOriginIsolated,
            screenShare: true,
            // disableRecord: false,
            disablePreview: true,
            success: (initResponse) => {
                console.log("initResponse: ", initResponse);
                zoomModule.generateSignature({
                    meetingNumber: mn.trim(),
                    apiKey: ZOOM_JWT_API_KEY,
                    apiSecret: ZOOM_JWT_API_SECRET,
                    role: role,
                    success: function (res) {
                        let signature = res.result;
                        // Join meeting
                        zoomModule.join({
                            meetingNumber: mn.trim(),
                            userName: name,
                            userEmail: email,
                            passWord: pwd.trim(),
                            apiKey: ZOOM_JWT_API_KEY,
                            signature: signature,
                            success: function (res) {
                                console.log("join meeting success");
                                console.log("get attendeelist");
                                zoomModule.getAttendeeslist({});
                                zoomModule.getCurrentUser({
                                    success: function (res) {
                                        console.log("success getCurrentUser", res.result.currentUser);
                                    },
                                });

                                zoomModule.inMeetingServiceListener('onUserJoin', function (data) {
                                    console.log('inMeetingServiceListener onUserJoin', data);
                                });

                                zoomModule.inMeetingServiceListener('onUserLeave', function (data) {
                                    console.log('inMeetingServiceListener onUserLeave', data);
                                });

                                zoomModule.inMeetingServiceListener('onUserIsInWaitingRoom', function (data) {
                                    console.log('inMeetingServiceListener onUserIsInWaitingRoom', data);
                                });

                                zoomModule.inMeetingServiceListener('onMeetingStatus', function (data) {
                                    console.log('inMeetingServiceListener onMeetingStatus', data);
                                });
                            },
                            error: function (res) {
                                console.log("Joining Error: ", res);
                            },
                        });
                    },
                    error: ((err) => { console.error('Error while generating Signature', err); })
                });
            },
            error: (initError) => {
                console.error("initError: ", initError);
            }
        })
    }

    const prepareLoadingWebSDK = async (module) => {
        let ZoomMtg = module.ZoomMtg
        await ZoomMtg.setZoomJSLib('https://source.zoom.us/2.1.1/lib', '/av');
        await ZoomMtg.preLoadWasm();
        await ZoomMtg.prepareWebSDK();
        ZoomMtg.i18n.load(lang);
        ZoomMtg.i18n.reload(lang);
        ZoomMtg.reRender({ lang: lang });
        return ZoomMtg;
    }

    return (
        <>Loading...</>
    )
}
export default Meeting