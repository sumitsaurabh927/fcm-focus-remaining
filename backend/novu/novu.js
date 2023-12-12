import { Novu, PushProviderIdEnum } from '@novu/node';

export const inAppNotification = async (title, body) => {

    const novu = new Novu(process.env.NOVU_API_KEY);
    // console.log("native ", process.env.NOVU_API_KEY);
    // console.log('pre identify')
    await novu.subscribers.identify('', {
        firstName: ""
    });

    // console.log('pre set cred')

    await novu.subscribers.setCredentials('', PushProviderIdEnum.FCM, {
        deviceTokens: [''],
    });

    // console.log('after set cred')
    novu.trigger('', {
        to: {
            subscriberId: ''
        },
        payload: {
            title: title,
            body: body
        },
        // overrides: {
        //     fcm: {
        //         data: {
        //         }
        //     },
        // },
    });
};